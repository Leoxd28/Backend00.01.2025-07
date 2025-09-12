class GitHubAPI {
  constructor() {
    this.baseUrl = 'https://api.github.com/users/';
  }

  async getUser(username) {
    const res = await fetch(`${this.baseUrl}${username}`);
    if (!res.ok) throw new Error('GitHub user not found');
    return await res.json();
  }
}

module.exports = GitHubAPI;