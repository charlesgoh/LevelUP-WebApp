# **LevelUP Standards and Guides**<br/>
This README outlines the layout standards used for the web apps components for convenience during development. It also includes basic SOPs for code collaboration.

# **Layout Standards**<br/>
Review the layout standards for the decided fonts and colours used throughout the web application. The style may change in the future. Check back occasionally for updates.

## Default Font<br/>
http://materializecss.com/typography.html<br/>
Roboto 2.0 will be used. This is the default font for MaterializeCSS, which is the front-end framework we are using. Use **flow-text** for text in page components like cards.

Also note that because we are using ES6 and JSX, we must use **className** in place of **class** because the latter is a reserved word in JSX.

## Default Colours
http://materializecss.com/color.html<br/>
We will be using colours as listed in the documentation page above. These colours will mostly adhere to the Material design guidelines. The most significant colours used are:

## Other Styling
http://materializecss.com/<br/>
Please refer to this site for the details for other styling defaults and how to use them. Special cases will be discussed and then added at a later date.

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

### After Making Changes
In your development branch: <br/>
`$ git merge master` <br/>
Resolve merge conflicts. <br/>
`$ git checkout master`<br/>
`$ git merge development` <br/>
Or do a pull request. This will be updated as we learn more about collaborating using git.

# **Other Tips**
## Kill Localhost Process
Sometimes we accidentally close the terminal window where we ran `npm start`. The next time we try running it will say that the port 3000 has already been taken. To solve this problem, we kill the process:<br/>
`lsof -i :3000`<br/>
Replace 3000 with any port number

We can discuss any questions on the slack channel.
**IMPORTANT** Version must be the same between all collaborators to ensure consistency in code produced and library components used. This is especially important with React because it is constantly evolving (e.g. v4 of React Router changed from v3 quite a lot). Notify everyone in the team earlier to inform them.

# **Good Luck : )**
> A journey of a thousand miles begins with a single step
<br/>-- Lao Zi
