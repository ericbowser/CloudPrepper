# 1-2-1: Implementing Version Control

After completing this episode, you should be able to:

+ Identify and explain the importance of implementing version control in DevOps environments, given a scenario.

**Description:** In this episode, the learner will examine the significance of implementing version control in DevOps environments. We will explore key version control processes such as code review, pull requests, pushes, and commits.

+ Describe the process of implementing version control in DevOps environments 
  + Involves setting up a systematic workflow that supports multiple developers working on the same project effectively and efficiently. It ensures code integrity and collaboration through the following key processes such as code review, pull requests, pushs, commits and merges.
+ Describe the key DevOps processes
  + Code Review  
    + A critical step where team members critically evaluate each other's code changes before they are merged into the main project. This helps improve code quality and ensures adherence to coding standards.  
    + Examples - Using tools like Gerrit or GitHub pull requests to facilitate peer reviews, allowing for comments, suggestions, and approvals.
  + Code Commit  
    + The act of saving changes to the version control system, which includes a descriptive message about what was changed and why. Commits give a history that others can follow to understand the project’s development.  
    + Each commit serves as a potential rollback point and can be used to track changes over time.
  + Code Branch
    + A divergence from the main line of development, used to develop new features or fix bugs without affecting the stable codebase.
    + Example - Creating a "feature" branch from the main branch to develop a new functionality, which can later be merged back without disrupting the ongoing development on the main branch.
  + Code Merge  
    + The process of integrating changes from one branch \(e.g., a feature branch\) into another \(e.g., the main branch or master\). This is critical after changes have been reviewed and approved in pull requests. 
    + Examples - Merging a feature branch into the master branch in Git after successful code review and tests, resolving any conflicts that arise during this process.
  + Pull Request  
    + A feature in version control systems that lets developers tell others about changes they've pushed to a branch in a repository on platforms like GitHub or Bitbucket.  
    + Typically used to initiate code review and merging process. A pull request occurs when a developer seeks to merge their branch into the main codebase after implementing a feature or fixing a bug.
  + Code Push  
    + Refers to uploading local repository changes to a remote repository. This action updates the remote with the latest commits from the local repository.  
    + Examples - pushing code to central repositories like GitHub or GitLab after local commits to ensure all team members have access to the latest version.
+ Describe the importance of implementing version control in DevOps environments
  + Implementing these version control practices is essential for maintaining a stable codebase, facilitating effective collaboration among development team members, and ensuring the final product is of high quality.


### Additional References

```
# Configure global setting in git
git config --global user.name "John Smith"
git config --global user.email "jsmith@yourdomain.com"
git config --global core.editor nano
git config --global init.defaultbranch main

# creates a project/directory in git
git init

# Adds all files to staging
git add .

# Commit changes to the current working tree
git commit -m "My 1st commit, student@acilearning.com"


# Show working tree status
git status

# Create a "feature" branch
git branch feature

# Switch to "feature" branch
git switch feature

# Merge "feature" branch into the "main" branch
git checkout main
git merge feature

# Verify clean branch
git status

# Show last commit
git show
```
