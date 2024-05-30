# Infragenie GitHub Action

The Infragenie GitHub Action automates the process of analyzing your repository's infrastructure files and **automatically generates an architecture diagram**. This diagram is **committed back to the repository**, ensuring that any previously made changes to the diagram using the [Infragenie](https://infragenie.eu) editor are preserved.

## Usage
To configure the Infragenie GitHub Action in your GitHub Actions pipeline, add the following to your workflow YAML file:

```yaml
on: [push]

# Write permissions are required to commit the diagram to the repository
permissions:
  contents: write

jobs:
  update-architecture:
    runs-on: ubuntu-latest
    steps:
      - uses: Rikenunes8/infragenie-ghaction@master
        with:
          access_token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

The action accepts the following inputs:

| Input         | Description                                                   | Required | Default                          |
|---------------|---------------------------------------------------------------|----------|----------------------------------|
| `access_token`| Access token to push the diagram                              | Yes      | N/A                              |
| `host`        | Infragenie host                                               | No       | `https://infragenie.eu`          |
| `readme`      | Create or update README.md file with the architecture diagram | No       | `false`                          |
| `repository`  | Repository where the diagram will be pushed                   | No       | `${{ github.repository }}`       |
| `branch`      | Branch where the diagram will be pushed                       | No       | Branch that triggered the action |
