// GitHub Integration - Push codebase to repository
import { Octokit } from '@octokit/rest';

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
  try {
    const octokit = await getUncachableGitHubClient();
    
    // Get authenticated user info
    const { data: user } = await octokit.users.getAuthenticated();
    console.log(`\nAuthenticated as: ${user.login}`);
    console.log(`GitHub Profile: ${user.html_url}\n`);
    
    // List repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: 10
    });
    
    console.log('Your recent repositories:');
    repos.forEach((repo, index) => {
      console.log(`  ${index + 1}. ${repo.full_name} - ${repo.html_url}`);
    });
    
    console.log('\n--- GitHub Connection Successful ---');
    console.log('\nTo push this codebase to GitHub:');
    console.log('1. Create a new repository on GitHub (or use an existing one)');
    console.log('2. Run the following git commands in the Shell:\n');
    console.log('   git init');
    console.log('   git add .');
    console.log('   git commit -m "Initial commit: Café Gourmand Dubai E-Commerce"');
    console.log('   git branch -M main');
    console.log('   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git');
    console.log('   git push -u origin main\n');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
