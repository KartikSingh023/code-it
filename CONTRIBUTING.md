# Contribute to codeBox

Contributing to an unfamiliar project can be a daunting task, to say nothing of ones with new technologies. We're here to tell you to try nonetheless.

This project makes use of `docker`. However the code is modularized enough that it does not require knowledge of docker to contribute to the project. Take your time to go through [our documentation](./docs/DOCS.md) and familiarise yourself with setting up the project. Once you have succesfully installed everything, running the project is a simple few commands.

_Linux users rejoice, for you have access to the convinient bash scripts to help you setup and run the project_

If you have any troubles setting up the project, feel free to contact the developers. Happy contributing!

# Quick Links

- [Docker](https://docs.docker.com/get-docker/)
- [`codeBox` Documentation](./docs/DOCS.md)

# Contributing Guidelines

To ensure contributions are organized, we have set up a few contribution guidelines that we would like you to follow. These are more of a "best practices" than a rule, use them as a guideline to help you keep your commits orderly.

## Commits

We are now adopting semantic commits. In general the format is as follows: `<type>: <subject>`. The type gives us a quick understanding of what the commit is about without having to read it entirely.

You can learn more about it [here](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

**Some Example Commit Messages:**

- `fix: sign up submit btn`
- `add: navbar component`
- `docs: add CONTRIBUTING.md`

## Branches

You will be making a new branch for any issue you decide to tackle, so we would like you to follow a general structure for the branch names.

The format can be `<number>-<desc>`

- `number` is the issue number that you are working on.
- `desc` is a brief descriptor of what the issue is. You can take a few key words from the issue title itself.

**An Example Branch Name:**

Issue #6: Fix submit button on sign up page

Branch name: `6-sign-up-btn`

# Getting Started

Here's some tips to get you started with contributing

Before we move onto anything, try to install, set up and run the project. Any issues surrounding the set up process will become very apparent. You can contact us, or file an issue to help fix your problems.

Once the project is up and running, play around with it. Use as many features as you can find and familiarise yourself with the functioning of the project. Check out the [README](./README.md) to help you along the way. At the same time, try and look through the source code for the project. This can be confusing at first but having some idea of the code is important to contribute to it.

Now you can finally move on to contributing. Open up the project repository and go to the Issues tab and find an open issue that you wish to work on. Then ask the maintainers to assign the issue to you.

## Steps

### 1. Fork the repository

You will be working on your own fork of the repository and make PRs to the original repo. Clone this forked repo onto your computer to start working.

### 2. Make a branch

```
$ git checkout -b branch-name
```

Use the guidelines mentioned above to help you name your branches.

### 3. Code

Now that you have a branch, you can work on the issue. Try and keep your code readable. If the code affects the UI, ensure that the updation still fits the aesthetic style of the original. Run the project with your changes and test it's functioning.

### 4. Commit

Once you are happy with your changes, you are ready to upload your code.

Run this to stage your changes

```
$ git add .
```

Then make the commit

```
$ git commit -m "type: commit message"
```

Finally, push the commit to your repository

```
$ git push -u origin your-new-branch-name
```

Alternatively use the GUI git tooling available in VS Code, if you are familiar with it.

Use the aforementioned guidelines to help you write the commit message.

### 5. Make a Pull Request

Back in GitHub land, open your forked repository and head to the Pull Requests tab. Then click on "New Pull Request"

Ensure you are merging from the issue branch in your repository, to the main branch in the original repository. Add a sensible title and description of your changes, and submit the PR.

# Make Your Own Issue

We encourage you to use this application and contribute to its development. In the process, if you find any bugs or have feature requests, and wish to contribute in that aspect, feel free to start an issue on our GitHub.

You can also make an issue if you have any inquiry or doubt. Use the `question` label for this.
