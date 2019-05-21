#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors')
var readlineSync = require('readline-sync');
let fs = require('fs') //fs already comes included with node.
let templates = require('./templates/templates.js')

let appName = process.argv[2]
let appDirectory = `${process.cwd()}/${appName}`

const dependeciesRequired = {
  'react-materialize': {
    value: null,
    dependency: ['react-materialize'],
    dependencyType: '--save'
  },
  // 'eslint': {
  //   value: null,
  //   dependency: ['eslint', 'eslint-plugin-react@latest', 'eslint-config-airbnb', 'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'prettier', 'lint-staged'],
  //   dependencyType: '--save-dev'
  // },
  // 'husky': {
  //   value: null,
  //   dependency: ['husky '],
  //   dependencyType: '--save-dev'
  // },
  'styled-components': {
    value: null,
    dependency: ['styled-components'],
    dependencyType: '--save'
  }
}
let installablePackages = [[],[]];

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
  await takeUserInput()
  await cdIntoNewApp()
  await installPackages()
  await updateTemplates()
  console.log("All done")
}

const takeUserInput = () => {
  return new Promise((resolve, reject) => {
    let promises = [];
    Object.keys(dependeciesRequired).forEach((dependency, i) => {
      promises[i] = new Promise(res => {
        return takeInput(`Would you like to install ${dependency}? yes/no  `, res, dependency)
      });
    });
    Promise.all(promises).then(()=>{resolve()})
  });
}
const takeInput = (msg, res, dependency) => {
  let answer = readlineSync.question(msg, {
    trueValue: ['yes', 'y', 'Yes', 'YES', 'Y', ''],
    falseValue: ['no', 'No', 'NO', 'N', 'n']
  });
  if (answer === true) {
    dependeciesRequired[dependency]['value'] = true;
    res()
  } else if (answer === false) {
    dependeciesRequired[dependency]['value'] = false;
    res()
  } else {
    console.log('Please enter valid input. "' + answer + '" what does it mean?');
    return takeInput(msg, res, dependency);
  }
}
const cdIntoNewApp = () => {
  return new Promise(resolve=>{
    shell.exec(`cd ${appName}`, ()=>{resolve()})
  })
}
const installPackages = () => {
  return new Promise(resolve=>{
    Object.keys(dependeciesRequired).forEach((packageName, i) => {
      if(dependeciesRequired[packageName]['value']){
        if(dependeciesRequired[packageName]['dependencyType'].includes('--save-dev')){
          for(let j=0; j<dependeciesRequired[packageName]['dependency'].length; j++){
            installablePackages[0].push(dependeciesRequired[packageName]['dependency'][j])
          }
        } else {
          for(let j=0; j<dependeciesRequired[packageName]['dependency'].length; j++){
            installablePackages[1].push(dependeciesRequired[packageName]['dependency'][j])
          }
        }
      }
    })
    // console.log('installPackages:-- ', installablePackages[1].join(' '), 'for dev ',installablePackages[0].join(' '))
    console.log(`\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk ${installablePackages[1].join(' ')}\n`.cyan)
    shell.exec(`npm install --save redux react-router react-router-dom react-redux redux-thunk ${installablePackages[1].join(' ')}`, () => {
      if(installablePackages[0].length){
        shell.exec(`npm install --save-dev ${installablePackages[0].join(' ')}`, () => {
          console.log("\nFinished installing packages installablePackages\n".green)
          resolve()
        })
      } else {
        console.log("\nFinished installing packages\n".green)
        resolve()
      }
    })
  })
}

const updateTemplates = () => {
  return new Promise(resolve=>{
    let promises = [];
    Object.keys(templates).forEach((fileName, i)=>{
      promises[i] = new Promise(res=>{
        // console.log(`\nFilename-------- ${fileName}\n`.green, fileName && fileName.includes('/'))
        if(fileName.includes('package')){
          if(installablePackages[1].length){
            for(let i=0; i< installablePackages[1].length; i++){
              let name = installablePackages[1][i];
              templates[fileName]['dependencies'][name]= '@latest';
            }
          }
          if(installablePackages[0].length){
            for(let i=0; i< installablePackages[0].length; i++){
              let name = installablePackages[0][i];
              templates[fileName]['devDependencies'][name]= '@latest';
            }
          }
        }
        if(fileName && fileName.includes('exe_comand')){
            shell.exec(`rm -rf ${appDirectory}/src/${templates[fileName]}`, () => {
              // console.log(`\nDeleting-------- ${templates[fileName]}\n`.red)
            })
        } else {
          if(fileName && fileName.includes('/')){
              let dirArray = fileName.split('/');
              dirArray.map((dir, index) => {
                return new Promise(res1 => {
                  if(!dir.endsWith('.js')){
                    // console.log('Creating Directory')
                    shell.exec(`mkdir ${appDirectory}/src/${dir}`);
                  }
                })
              })
              fs.writeFile(`${appDirectory}/src/${dirArray.join('/')}`, templates[fileName], function(err) {
                if(err) { return console.log(err) }
                res()
              })
          } else {
            if(fileName.includes('eslint') || fileName.includes('package')){
              if(dependeciesRequired['eslint'] && dependeciesRequired['eslint']['value']){
                fs.writeFile(`${appDirectory}/${fileName}`, JSON.stringify(templates[fileName]), function(err) {
                  if(err) { return console.log(err) }
                  res()
                })
              }
            } else {
              fs.writeFile(`${appDirectory}/src/${fileName}`, templates[fileName], function(err) {
                if(err) { return console.log(err) }
                res()
              })
            }
          }
        }
      // }
      })
    })
    Promise.all(promises).then(()=>{resolve()})
  })
}

run()
