module.exports = {
    // Default Presets
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    platform: "github",
    automergeType: "pr",
    platformAutomerge: true,
    rebaseWhen: "conflicted",
    onboarding: false,
    onboardingConfigFileName: "renovate.json5",
  
    // Dependency Dashboard issue customization. 
    // https://docs.renovatebot.com/configuration-options/#dependencydashboard
    dependencyDashboardTitle: "Renovate Dependency Dashboard",
    dependencyDashboardHeader: "This issue lists Renovate updates and detected dependencies. Read the [Dependency Dashboard](https://docs.renovatebot.com/key-concepts/dashboard/) docs to learn more.<br>Renovate logs for debug [here](https://developer.mend.io/{{platform}}/{{repository}}).",
    // Labels used for PR's
    labels: [
      "dependencies",
      "renovate"
    ],
    baseBranches: [
      "main",
      "master"
    ],
    enabledManagers: [
      "github-actions",
      "terraform",
      "dockerfile",
      "nuget",
      "azure-bicep-resource",
      "custom.regex"
    ],
    // Presets Configs 
    // Can be found here: 
    // https://docs.renovatebot.com/presets-default/
    extends: [
      "config:recommended",
      "docker:pinDigests",
      "helpers:pinGitHubActionDigests",
      ":configMigration",
      ":pinDevDependencies",
      ":semanticPrefixFixDepsChoreOthers",
      ":ignoreModulesAndTests",
      ":autodetectRangeStrategy",
      "group:recommended",
      ":prHourlyLimitNone",
      ":prConcurrentLimitNone",
      ":label(renovate)",
      ":rebaseStalePrs",
      "default:automergeDigest",
      ":ignoreUnstable"
    ],
    // Datasources
    // Can be found here: https://docs.renovatebot.com/modules/datasource/#datasources
    packageRules: [
      {
        // General
        description: "Label für Major-Updates",
        automerge: false,
        matchUpdateTypes: [
          "major"
        ],
        addLabels: [
          "major"
        ]
      },
      {
        description: "Label für nicht-Major-Updates",
        automerge: false,
        matchUpdateTypes: [
          "minor",
          "patch",
          "pin"
        ],
        addLabels: [
          "non-major"
        ]
      },
      {
        groupName: "Fixierte Digests",
        matchUpdateTypes: [
          "digest"
        ]
      },
      {
        // Terraform
        description: "tbd",
        automerge: false,
        matchManagers: [
          "terraform"
        ],
        groupName: "Terraform Providers",
        matchUpdateTypes: [
          "minor",
          "patch"
        ],
        addLabels: [
          "terraform",
          "renovate"
        ]
      },
      {
        // Dockerfile
        description: "tbd",
        matchManagers: [
          "dockerfile"
        ],
        matchUpdateTypes: [
          "patch"
        ],
        automerge: false,
        // schedule: [
        //   "before 5am every weekday"
        // ],
        matchPackageNames: [
          "/alpine/"
        ]
      },
      {
        description: "tbd",
        automerge: false,
        matchManagers: [
          "dockerfile"
        ],
        separateMinorPatch: true,
        matchPackageNames: [
          "/alpine/"
        ]
      },
      {
        // Github Actions
        description: "tbd",
        matchManagers: [
          "github-actions"
        ],
        matchUpdateTypes: [
          "minor",
          "patch"
        ],
        automerge: false,
        pinDigests: true,
        // schedule: [
        //   "before 5am every weekday"
        // ]
      },
      {
        // Bicep
        description: "tbd",
        matchManagers: [
          "azure-bicep-resource"
        ],
        matchUpdateTypes: [
          "minor",
          "patch"
        ],
        automerge: false,
        pinDigests: true,
        // schedule: [
        //   "before 5am every weekday"
        // ]
      }
  
    ],
    // Custom Manager Presets
    customManagers: [
      {
        customType: "regex",
        fileMatch: [
          "terraform.yml"
        ],
        matchStrings: [
          "# renovate: datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?\n.*?: (?<currentValue>.*)"
          //'# renovate: datasource=(?<datasource>.*?) depName=(?<depName>.*?)( versioning=(?<versioning>.*?))?(?<currentValue>[^"]+?)"?\\s',
        ]
      }
    ],
    allowedPostUpgradeCommands: [
      ".*"
    ]
  };