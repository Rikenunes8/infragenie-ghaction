import * as core from '@actions/core';
import * as github from '@actions/github';


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const token = core.getInput('access_token', { required: true });
    const host_url = core.getInput('host');
    const readme = core.getBooleanInput('readme');
    const repository = core.getInput('repository');
    let branch = core.getInput('branch');
    branch = branch === '' ? github.context.ref.replace('refs/heads/', '') : branch;
    
    const host = new URL(host_url);
    const path = "api/commit";
    const url = new URL(path, host);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          repo: repository,
          branch: branch,
          readme: readme
        }
      )
    })
    if (!response.ok) {
      throw new Error(await response.text())
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
