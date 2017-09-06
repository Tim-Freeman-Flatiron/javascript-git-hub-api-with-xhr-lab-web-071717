document.addEventListener("DOMContentLoaded", function () {

	const form = document.getElementById("input-form")
	const repositoriesList = document.getElementById("repositories")

	form.addEventListener("submit", function(e) {
		e.preventDefault()
		getRepositories(e)		
})

	repositoriesList.addEventListener("click", function(e) {
		if (event.target.innerHTML !== "Get Branches") {
			getCommits(e)
		} else {
			getBranches(e)
		}
	})

//end of DOMContentLoaded Listener	
})

function getBranches(event) {
	let repoName = event.target.dataset.repo
	let userName = event.target.dataset.user
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayBranches)
	req.open("GET", `https://api.github.com/repos/${userName}/${repoName}/branches`)
	req.setRequestHeader("Authorization", "token 20570cd1c6a6393b4d6d9c1404d622730f22d9a8")
	req.send()
}

function getCommits(event) {
	let repoName = event.target.dataset.repo
	let userName = event.target.dataset.user

	const req = new XMLHttpRequest()
	req.addEventListener("load", displayCommits)
	req.open("GET", `https://api.github.com/repos/${userName}/${repoName}/commits`)
	req.setRequestHeader("Authorization", "token 20570cd1c6a6393b4d6d9c1404d622730f22d9a8")
	req.send()
}

function getRepositories(event) {
	const username = document.getElementById("username").value
	const req = new XMLHttpRequest()
	req.addEventListener("load", displayRepositories)
	req.open("GET", `https://api.github.com/users/${username}/repos`)
	req.setRequestHeader("Authorization", "token 20570cd1c6a6393b4d6d9c1404d622730f22d9a8")
	req.send()
}

function displayCommits(event, data) {
	let commits = JSON.parse(this.responseText)
	console.log(commits)
	let commitList = `<ul>${commits.map(commit => '<li>' + commit.committer.login + ' - ' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = commitList
}

function displayBranches(event, data) {
	let branches = JSON.parse(this.responseText)
	let branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
	document.getElementById("details").innerHTML = branchList
}

function displayRepositories(event, data) {
	let repos = JSON.parse(this.responseText)
	let username = document.getElementById("username").value
	let repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" data-user="' + username + '">Get Commits</a>' + ' - <a href="#" data-repo="' + r.name + '" data-user="' + username + '">Get Branches</a></li>').join('')}</ul>`
	document.getElementById("repositories").innerHTML = repoList
}