import async from "async";

const wrap = (func) => {
  return async (params, callback) => {
    const resp = await func(params);
    if (resp.error) return callback(resp.error);
    return resp;
  };
};

async function wrapParallel(funtionList, array) {
  const funcs = funtionList.map((e) => wrap(e));

  let errors = [];
  try {
    await async.map(array, async (element) => {
      return await new Promise(async (resolve, reject) => {
        const appliedFn = async.applyEach(funcs, element, (err, result) => {
          if (err) {
            errors.push(err);
          } else {
            return result;
          }
        });

        appliedFn((err, result) => {
          if (errors.length > 0) return reject(errors);
          resolve(result);
        });
      });
    });

    return array;
  } catch (e) {
    return { errors: errors };
  }
}

export { wrapParallel };
