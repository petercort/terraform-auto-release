const axios = require('axios')
const core = require('@actions/core');

module.exports = async function createChangeRequest(){
  const url = `${process.env.SNOW_URL}/api/sn_chg_rest/change/normal`
  const username = process.env.SNOW_USERNAME
  const password = process.env.SNOW_PASSWORD
  const auth = {
    username: username,
    password: password
  }
  const body = {
    "short_description": "pc-test",
    "description": "This is a description of the standard change request.",
    "assignment_group": "assignment_group_sys_id",
    "requested_by": "requested_by_user_sys_id"
  }
  try {
    const response = await axios.post(url, body, { auth })
    console.log(`Created request: ${response.data.result}`)
    core.setOutput('sys_id', response.data.result.number.sys_id.value);
  } catch (error) {
    core.setFailed(error.message);
  }
}
