import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

const _access = promisify(fs.access);

const fileExists = path => _access(path).then(() => true, () => false);

const getFullData = (data, cfg) => Object.assign({}, cfg.data, data);

const normalizePath = (path) => {
  return !path.sep || path.sep === '\\' ? path.replace(/\\/g, '/') : path;
};

const getRelativeToBasePath = (filePath, plop) => filePath.replace(path.resolve(plop.getDestBasePath()), '');

const makePath = (data, cfg, plop) => {
  return path.resolve(
    plop.getDestBasePath(),
    plop.renderString(normalizePath(cfg.path) || '', getFullData(data, cfg))
  );
};

async function removeFile(data, cfg, plop) {
  const { force, skipIfNonexistent = false } = cfg;
  const filePath = makePath(data, cfg, plop);
  const exists = await fileExists(filePath);
  if (!exists) {
    if (skipIfNonexistent) { return `[SKIPPED] ${filePath} (does not exist)`; }
    throw `File already does not exists (set skipIfNonexistent to true to ignore this error)\n -> ${fileDestPath}`;
  } else {
    await del([filePath], { force });
  }
  return getRelativeToBasePath(filePath, plop);
}

module.exports = function (plop) {
  plop.setDefaultInclude({ actionTypes: true });
  plop.setActionType('removeFile', removeFile);
};
