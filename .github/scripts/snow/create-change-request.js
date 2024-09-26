const axios = require('axios')
const core = require('@actions/core');

module.exports = async () => {
  const url = `${process.env.SNOWURL}/api/sn_chg_rest/change/normal`
  console.log(url)
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
    console.log(url)
    const response = await axios.post(url, body, { auth })
    console.log(`Created request: ${response.data.number.display_value}`)
    core.setOutput('sys_id', response.data.number.sys_id.value);
  } catch (error) {
    core.setFailed(error.message);
  }
}
