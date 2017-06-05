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

### After Making Changes
In your development branch: <br/>
`$ git merge master` <br/>
Resolve merge conflicts. <br/>
`$ git checkout master`<br/>
`$ git merge development` <br/>
Or do a pull request. This will be updated as we learn more about collaborating using git.
