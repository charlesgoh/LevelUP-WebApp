# **LevelUP: An Orbital 2017 Project**<br/>
## Description
LevelUP is a platform that aims to match sports coaches with potential clients. <br/>

# **Layout Standards**<br/>
http://materializecss.com/<br/>
Check the documentation for materializecss for styling standards.

# **Version Control Collaboration (Github)**<br/>
Run this in bash/terminal before running anything important:<br/>
`$ git status`

## Working with **master** Branch

### Before Starting <br/>
`$ git pull --rebase`

### Pushing changes
`$ git add filename`<br/>
`$ git commit -m "Commit Message"`<br/>
`$ git status`<br/>
`$ git push`<br/>

## Working with other Branches
### Creating new branch
`$ git branch development`

### Moving between Branches
`$ git checkout development` to move into development branch
`$ git checkout master` to move into master branch

### SOP After Making Changes
**Important**: Create new Pull Request. Once all conflicts and issues have been resolved, proceed to merge.

#### Alternative Merge Method
In your master branch: <br/>
`$ git pull --rebase` <br/>
In your development branch: <br/>
`$ git merge master` <br/>
In your master branch: <br/>
`$ git merge branch` <br/>
**Note:** Only do this when you are absolutely sure that there will be no merge conflicts. Otherwise always do a pull request. This is for convenience and to prevent confusion. 

#### Resolving Merge Conflicts
1. Notify all parties affected
2. Resolve conflict together using Github's online **Web Editor**
3. Delete redundant files. This is also an effective way to resolve merge conflicts

### Deleting Branch After Merge
Three choices for deleting development branches:<br/>

#### Delete via Pull Request
When confirming merge to master using pull requests, select the option to delete branch

#### Delete Manually Through Github (Not Recommended)
Use SourceTree to delete local branch, and go to repository settings to delete remote branch.

#### Delete via Terminal
`$ git push origin --delete development` to delete remote branch.<br/>
`$ git branch -d development` to delete local branch.

#### Using Node Packet Manager in China
Node Packet Manager (NPM) is unavailable in China. Use either the cnpmjs or taobao npm packet managers.
##### Switching NPM Config Registry to Chinese Registry
`$ npm config set registry` http://r.cnpmjs.org`<br/>
`$ npm config set registry` https://registry.npm.taobao.org/`<br/>
The taobao npm mirror is suggested to be faster.<br/>

##### Switching NPM Registry Back to Default
`$ npm config set registry: http://registry.npmjs.eu` <br/>

### **NOTE**
The master branch is protected from any **rubbish** pull requests or force pushes. Resolve merge conflicts before attempting to merge into master.
