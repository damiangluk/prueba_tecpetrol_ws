const { error, NOT_FOUND_ENTITY, NOT_FOUND_DELETE } = require("../helpers/errorHelper");

const genericRepository = (model, db) => {
  const getAllGeneric = async (filters = {}, includes = [], attributes = {}, transaction = null) => {
    const options = {
      attributes: attributes,
      include: includes,
      where: filters,
      transaction: transaction
    };

    return await model.findAll(options);
  };

  const getByIdGeneric = async (id, includes = [], attributes = {}, transaction = null) => {
    const options = {
      attributes: attributes,
      include: includes,
      transaction: transaction
    };

    const data = await model.findByPk(id, options);
    if(!data) return error(NOT_FOUND_ENTITY);
    return data
  };

  const createGeneric = async (entity, transaction = null) => {
    const options = {
      transaction: transaction
    };

    return await model.create(entity, options);
  };

  const updateGeneric = async (id, entity, transaction = null) => {
    const options = {
      where: { id: id },
      transaction: transaction
    };

    await model.update(entity, options);
  };

  const removeGeneric = async (id, transaction = null) => {
    const options = {
      where: { id: id },
      transaction: transaction
    };

    const data = await model.destroy(options);
    if(!data) return error(NOT_FOUND_DELETE)
    return true
  };

  const createTransaction = async (callback) => {
    const transaction = await db.sequelize.transaction();

    try {
      const data = await callback(transaction);

      if(data.message) throw new Error(data.message);

      await transaction.commit();
      
      return data;
    } catch (error) {
      await transaction.rollback();
      return { error: `Fallo la transacción: ${error}` }
    }
  };

  return {
    getAllGeneric,
    createGeneric,
    updateGeneric,
    removeGeneric,
    getByIdGeneric,
    createTransaction
  };
};

module.exports = genericRepository;
