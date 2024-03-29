const fs = require("fs");
const {stat} = require("node:fs/promises");
const request = require("request");
const path = require("path");
const {getInfo} = require("./info");

async function getUsername(api) {
  const info = await getInfo({api});
  return info.username || "";
}

async function verifyResource(api, id) {
  const username = await getUsername(api);
  const output = await api.getResource(id);
  const access = await api.getResourceAccess(id);
  const result = access.find((element) => (element.aid === username && "w" in element));

  if (result === undefined) {
    throw Error("No write access to resource");
  } else return output;
}

async function getFileStream(filepath) {
  const resourceStream = fs.createReadStream(filepath);
  const filename = path.basename(filepath);
  const {size: filesize} = await stat(filepath);
  return {resourceStream, filename, filesize};
}

function getUploadError(data) {
  const dataString = data.toString();
  try {
    const parsed = JSON.parse(dataString);
    if (parsed.code && parsed.message) {
      return Error(parsed.message);
    } else return {};
  } catch (error) {
    return error;
  }
}

async function pipeStream(req, resourceStream) {
  return new Promise((resolve, reject) => {
    let uploadError = {};
    req.on("data", (data) => {
      uploadError = getUploadError(data);
    });
    req.on("end", () => {
      if ("message" in uploadError) {
        reject(uploadError);
      } else {
        resolve();
      }
    });
    req.on("error", (err) => reject(err));
    resourceStream.on("error", (err) => reject(err));
    resourceStream.pipe(req);
  });
}

function getInputFileHeader({accessToken, filename, filesize}) {
  const headers = {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": filesize,
  };
  return headers;
}

async function uploadStream({api, resourceStream, filename, filesize, id}) {
  const options = {
    url: `${api.config.commandServer}/commandSync/resource/${id}/upload`,
    headers: getInputFileHeader({accessToken: api.accessToken, filename, filesize}),
  };

  const req = request.post(options);
  return pipeStream(req, resourceStream);
}

async function uploadResource({id, filepath, api}) {
  if (filepath) {
    const output = await verifyResource(api, id);
    const {resourceStream, filename, filesize} = await getFileStream(filepath);
    await uploadStream({api, resourceStream, filename, filesize, id});
    return output;
  } else {
    return Error("Input streams unsupported!");
  }
}

module.exports = {
  uploadResource,
  getUploadError,
  pipeStream,
};
