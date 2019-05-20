#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors') // adding to make colorful logs
let fs = require('fs') //fs already comes included with node.
let templates = require('./templates/templates.js')

let appName = process.argv[2]
let appDirectory = `${process.cwd()}/${appName}`

const createReactApp = () => {
  return new Promise(resolve=>{
    if(appName){
      shell.exec(`create-react-app ${appName}`, () => {
        console.log("Created react app")
        resolve(true)
      })
    }else{
      console.log("\nNo app name was provided.".red)
      console.log("\nProvide an app name in the following format: ")
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan)
        resolve(false)
    }
  })
}

const run = async () => {
  let success = await createReactApp()
  if(!success){
    console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
    return false;
  }
  await cdIntoNewApp()
  await installPackages()
  await updateTemplates()
  console.log("All done")
}

const cdIntoNewApp = () => {
  return new Promise(resolve=>{
    // shell.cd(`${}appName`, () => resolve()})
     // shell.cd(`${appName}`, ()=>{resolve()})
    shell.exec(`cd ${appName}`, ()=>{resolve()})
  })
}

const installPackages = () => {
  return new Promise(resolve=>{
    console.log("\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk\n".cyan)
    shell.exec(`npm install --save redux react-router react-redux redux-thunk react-router-dom styled-components`, () => {
      console.log("\nFinished installing packages\n".green)
      resolve()
    })
  })
}

const updateTemplates = () => {
  return new Promise(resolve=>{
    let promises = [];
    Object.keys(templates).forEach((fileName, i)=>{
      promises[i] = new Promise(res=>{
        console.log(`\nFilename-------- ${fileName}\n`.green, fileName && fileName.includes('/'))
        if(fileName && fileName.includes('exe_comand')){
          shell.exec(`rm -rf ${appDirectory}/src/${templates[fileName]}`, () => {
            console.log(`\nDeleting-------- ${templates[fileName]}\n`.red)
          })
        } else {
          if(fileName && fileName.includes('/')){
              let dirArray = fileName.split('/');
              console.log('dirArray', dirArray)
              dirArray.map((dir, index) => {
                console.log('item:--- ', dir, !dir.endsWith('.js'))
                return new Promise(res1 => {
                  if(!dir.endsWith('.js')){
                    console.log('Creating Directory')
                    shell.exec(`mkdir ${appDirectory}/src/${dir}`);
                  }
                })
              })
              fs.writeFile(`${appDirectory}/src/${dirArray.join('/')}`, templates[fileName], function(err) {
                if(err) { return console.log(err) }
                res()
              })
          } else {
            fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], function(err) {
              if(err) { return console.log(err) }
              res()
            })
          }
        }
      })
    })
    Promise.all(promises).then(()=>{resolve()})
  })
}

run()
