const knex = require('knex');

const config = require('../knexfile.js');

// we must select the development object from our knexfile
const db = knex(config.development);

function find () {
 return db("schemes")
}

function findById (id) {
    return db("schemes")
    .where({id})
    .then(result => result.length === 1 ? result : null)
}

function findSteps (id) {
    return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .orderBy("st.step_number", "asc")
    .where({"sc.id": id})
}

function add (scheme) {
    return db("schemes")
    .insert(scheme)
    .then(ids => ({ ...scheme, id: ids[0] }));
}

function addStep(step, scheme_id) {
    return db("steps")
    .insert({...step, scheme_id: scheme_id})
}

function update (changes, id) {
    return db("schemes")
    .where({id})
    .update(changes)
}

function remove (id) {
    return db("schemes")
    .where({id})
    .del()
}

// export for use in codebase
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
};