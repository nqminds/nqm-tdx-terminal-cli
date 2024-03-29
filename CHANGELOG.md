# Changelog
All notable changes to this project will be documented in this file.

The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## [2.0.0] - 2022-12-16

### Changed

- **BREAKING CHANGE**: The minimum supported version of Node is now Node.JS 16.

### Dependencies

- Removed `@nqminds/nqm-databot-utils` as a dependency

## [1.0.4] - 2020-04-22

### Changed
 - Added dual use of puppeteer

### Fixed


## [1.0.3] - 2020-04-21

### Changed

### Fixed
 - Make list command require an input alias so that it is backwards compatible with other code

## [1.0.2] - 2020-04-20

### Changed
 - Added unified json output with the option ```-j```

### Fixed
 - Make list command not require an input alias

## [1.0.1] - 2020-03-19

### Changed
 
### Fixed
 - Config file specification bug
 
## [1.0.0] - 2020-02-17

### Changed
 - Added databot deploy command.
 - Added shortening of the command line arguments.
 - Added get app url command.
 
### Fixed

## [0.2.8] - 2020-02-11

### Changed
 - The .env and alias config files stored in home dir (```.tdxcli```).
 
### Fixed


## [0.2.7] - 2020-02-07

### Changed

### Fixed
- Upload bug (added write verification).

## [0.2.6] - 2020-02-07

### Changed

- Added ```list``` command with ```type=["aliases", "secrets"]```.
- Added ```--credentials``` option to run commands without signing in.
- Added ```TDX_CREDENTIALS``` environment variable to run commands without signing in.

### Fixed
- Script crashed because of unknown request module.

## [0.2.3] - 2020-02-06

### Changed

- Added github actions
- Added Ivan's review comments
- Added Alois's review comments

### Fixed

