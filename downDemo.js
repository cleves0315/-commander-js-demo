import ora from 'ora'
import { promisify } from 'util'
import download from 'download-git-repo'
// const { promisify } = require('util')
// const download = require('download-git-repo')

const clone = async function (repo, desc) {
  // const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
  const downloads = promisify(download) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
  const process = ora(`下载......${repo}`)

  process.start() // 进度条开始
  await downloads(repo, desc)
  //  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
  // GitHub - github:owner/name or simply owner/name
  // GitLab - gitlab:owner/name
  // Bitbucket - bitbucket:owner/name
  process.succeed()
}

clone('github:cleves0315/chrome-extension-cli', `test/${Date.now()}`)