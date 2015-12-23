import loadZips from '../shared/load-zips'
import importData from '../shared/import-data'

exports.seed = async function(knex, Promise) {
  let zipCodes = loadZips('./seeds/shared/zip-codes.csv')
  await knex('zip_codes').del()
  await importData('zip_codes', zipCodes)
};
