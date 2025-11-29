// GitHub Integration - Create repo and push codebase
import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  const repoName = 'cafe-gourmand-redesign';
  
  try {
    const octokit = await getUncachableGitHubClient();
    const accessToken = await getAccessToken();
    
    // Get authenticated user
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${user.login}\n`);
    
    // Check if repo exists
    let repoExists = false;
    try {
      await octokit.repos.get({
        owner: user.login,
        repo: repoName
      });
      repoExists = true;
      console.log(`Repository ${repoName} already exists. Will push to existing repo.`);
    } catch (e: any) {
      if (e.status === 404) {
        console.log(`Creating new repository: ${repoName}...`);
        // Create new repository
        await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          description: 'Café Gourmand Dubai - Premium Coffee E-Commerce Platform with 3D effects, smooth animations, and shopping cart functionality',
          private: false,
          auto_init: false
        });
        console.log(`Repository created successfully!`);
      } else {
        throw e;
      }
    }
    
    const repoUrl = `https://github.com/${user.login}/${repoName}`;
    console.log(`\nRepository URL: ${repoUrl}`);
    
    // Configure git and push
    console.log('\nConfiguring git...');
    
    // Set git config
    try {
      execSync('git config user.email "prottus2004@github.com"', { stdio: 'pipe' });
      execSync('git config user.name "prottus2004"', { stdio: 'pipe' });
    } catch (e) {
      // Ignore if already set
    }
    
    // Check if .git exists, if not initialize
    if (!fs.existsSync('.git')) {
      console.log('Initializing git repository...');
      execSync('git init', { stdio: 'inherit' });
    }
    
    // Create/update .gitignore
    const gitignoreContent = `node_modules/
dist/
.env
.env.local
*.log
.DS_Store
.replit
replit.nix
.cache/
tmp/
`;
    fs.writeFileSync('.gitignore', gitignoreContent);
    
    // Add all files
    console.log('Adding files...');
    execSync('git add -A', { stdio: 'inherit' });
    
    // Commit
    console.log('Committing changes...');
    try {
      execSync('git commit -m "Café Gourmand Dubai - Premium Coffee E-Commerce Platform"', { stdio: 'inherit' });
    } catch (e) {
      console.log('No new changes to commit or commit already exists.');
    }
    
    // Set branch to main
    try {
      execSync('git branch -M main', { stdio: 'pipe' });
    } catch (e) {
      // Ignore
    }
    
    // Remove existing remote if exists
    try {
      execSync('git remote remove origin', { stdio: 'pipe' });
    } catch (e) {
      // Ignore if no remote
    }
    
    // Add remote with token auth
    const remoteUrl = `https://${accessToken}@github.com/${user.login}/${repoName}.git`;
    execSync(`git remote add origin ${remoteUrl}`, { stdio: 'pipe' });
    
    // Push to GitHub
    console.log('\nPushing to GitHub...');
    execSync('git push -u origin main --force', { stdio: 'inherit' });
    
    console.log('\n✅ Successfully pushed to GitHub!');
    console.log(`\n🔗 View your repository: ${repoUrl}`);
    
  } catch (error: any) {
    console.error('Error:', error.message || error);
  }
}

main();
