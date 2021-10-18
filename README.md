# Outer Wilds Mod Template

Use this project as a base for new Outer Wilds mods.

<!-- TOC -->

- [Prerequisites](#prerequisites)
- [How to use this template](#how-to-use-this-template)
- [Editing ModTemplate.csproj.user](#editing-modtemplatecsprojuser)
  - [`<GameDir>`](#gamedir)
  - [`<OwmlDir>`](#owmldir)
  - [`<ModUniqueName>`](#moduniquename)
- [Editing manifest.json](#editing-manifestjson)
  - [fileName](#filename)
  - [author](#author)
  - [name](#name)
  - [uniqueName](#uniquename)
  - [version](#version)
  - [owmlVersion](#owmlversion)
- [Updating OWML](#updating-owml)
- [Building the mod](#building-the-mod)
- [Releasing the mod](#releasing-the-mod)
  - [Increasing the version](#increasing-the-version)
  - [Pushing the code to GitHub](#pushing-the-code-to-github)
  - [Creating a file for the release](#creating-a-file-for-the-release)
  - [Uploading the release to GitHub](#uploading-the-release-to-github)
  - [Adding your mod to the database](#adding-your-mod-to-the-database)
- [Troubleshooting](#troubleshooting)

<!-- /TOC -->

## Prerequisites

- Visual Studio ([download Visual Studio Community here](http://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community));
- Outer Wilds Mod Manager (get it from the [Outer Wilds Mods](https://outerwildsmods.com/) website);
- OWML installed in the Mod Manager;
- A GitHub account (required for forking the repo and for releasing your mod to the public);

## How to use this template

1. [Generate your repository from this template](https://github.com/Raicuparta/ow-mod-template/generate);
2. Clone your new repository to your machine;
3. Edit `ModTemplate/ModTemplate.csproj.user` (see [Editing ModTemplate.csproj.user](#editing-modtemplatecsprojuser) for more info);
4. Edit `ModTemplate/manifest.json` (see [Editing manifest.json](#editing-manifestjson) for more info);
5. Open `ModTemplate.sln` in Visual Studio (double clicking the `.sln` file should do the trick);
6. Start writing your mod code in `ModTemplate/ModTemplate.cs` ([Read OWML's docs to learn what you can do](https://github.com/amazingalek/owml/wiki/For-modders)).
7. [Build the mod](#building-the-mod);
8. [Release the mod](#releasing-the-mod);

## Editing ModTemplate.csproj.user

Use any text editor for editing this file (Notepad or whatever). The file `ModTemplate/ModTemplate.csproj.user` should look like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="Current" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup>
    <ProjectView>ProjectFiles</ProjectView>
    <GameDir>GAME_DIR</GameDir>
    <OwmlDir>OWML_DIR</OwmlDir>
    <ModUniqueName>MOD_UNIQUE_NAME</ModUniqueName>
  </PropertyGroup>
</Project>
```

You need to replace `GAME_DIR`, `OWML_DIR` and `MOD_UNIQUE_NAME` between the tags. Be careful not to change the tags themselves (the stuff between `< >`, since that will break the file). Remember to restart Visual Studio (or just reload your mod project) if you edit this file, otherwise the changes won't be applied.

#### `<GameDir>`

This is the directory that contains the game's executable (`OuterWilds.exe`). Don't include the executable in the path, just the directory;

#### `<OwmlDir>`

This is the directory that contains `OWML.Launcher.exe`. You can find this directory using the Mod Manager: press the three dots menu button in OWML's row, and select "Show in explorer". Again, don't include the executable in the path;

#### `<ModUniqueName>`

A unique ID for your mod. Make sure it matches `uniqueName` in this mod's `manifest.json`;

## Editing manifest.json

Use any text editor for editing this file (Notepad or whatever). The file `ModTemplate/manifest.json` should look like this:

```json
{
  "filename": "ModTemplate.dll",
  "author": "AUTHOR",
  "name": "MOD_NAME",
  "uniqueName": "MOD_UNIQUE_NAME",
  "version": "0.1.0",
  "owmlVersion": "0.7.3"
}
```

Edit each entry with the correct information for your mod:

#### fileName

Visual Studio will use the project's name for the dll, so this will usually be `[ProjectName].dll`. Since this template's project name is `ModTemplate`, `fileName` will be `ModTemplate.dll`. Remember that if you change your project's name, you'll have to change this entry too.

#### author

Your beautiful name.

#### name

The human-readable name of your mod, which will show in the Mod Manager.

#### uniqueName

The unique ID of your mod. Must match `<ModUniqueName>` in `.csproj.user`. Can be anything really, as long as it isn't already taken by another mod. You can search for your `uniqueName` in the [mod database](https://raw.githubusercontent.com/Raicuparta/ow-mod-db/master/database.json) if you wanna make sure it isn't already in use.

#### version

The version number of the mod. It's important that this version number is consistent with the versions used in GitHub releases. (see [Releasing the mod](#releasing-the-mod) for more info);

#### owmlVersion

OWML version used for your mod. Only used to show a warning to users using an OWML version different than this. Just make sure that the version here is the one installed in the NuGet packages (see [Updating OWML](#updating-owml) for more info);

## Updating OWML

It's important to keep OWML up to date in your project. In Visual Studio's Solution Explorer, right click "References" and select "Manage NuGet Packages...". In the "Installed" tab, find OWML and press the update button, if it's available (blue circle with a white arrow pointing up). After updating, make note of the new OWML version number. Update your `manifest.json` file with the latest OWML version (see [Editing manifest.json](#editing-manifestjson) for more info).

## Building the mod

Before attempting to build the mod, make sure you've edited [ModTemplate.csproj.user](#editing-modtemplatecsprojuser), and [manifest.json](#editing-manifestjson) with the correct info. After that's done, go to Visual Studio, open the "Build" menu at the top, and select "Build Solution". If all goes well, your mod should immediately show up the the Mod Manager. You can now press "Start Game" in the manager, and the game should start with your mod enabled (as long as your mod has the checkbox set to enabled).

## Releasing the mod

After you've written the code for your mod, you can release it and make it available for download.

#### Increasing the version

Always increase your mod's version in [manifest.json](#editing-manifestjson) every time you publish a new release. For instance, change it from "0.1.0" to "0.2.0".

#### Pushing the code to GitHub

If you forked the ow-mod-template repository as per the initial instructions, you now have your own version of this repository in your GitHub account. Your GitHub username will displayed as the mod's author, and the description for the mod will be fetched from the repository description on Github.

#### Creating a file for the release

In the Mod Manager, find your mod, click the three dots menu button, and select "Show in explorer". You should see the directory to where your mod was built. Create a **zip** that includes all these files. This will be your release. Has to be **zip** specifically.

#### Uploading the release to GitHub

1. Go to the releases page of your repository (GitHub should show you a link to this page on the right side of the repository's page). Press "Draft a new release".
2. In the "Tag version" field, insert the same mod version that you included in [manifest.json](#editing-manifestjson). It's very important that the release tag version is the same as the `version` field in the `manifest.json` inside the zip, otherwise your mod will always show as outdated in the Mod Manager.
3. Release title and description are up to you.
4. Add your zip to the release as a binary by drag & dropping the file to the release assets area (or just click "Attach binaries by etc etc" and select your file). Make sure you only upload one zip file, since anything after the first one will be ignored by the mod database / mod manager.
5. Press "Publish release".

#### Adding your mod to the database

To make your mod show up in the Mod Manager and in [outerwildsmods.com](https://outerwildsmods.com), you need to add it to the database. Follow the instructions in the [Outer Wilds Mod Database readme](https://github.com/Raicuparta/ow-mod-db#outer-wilds-mod-database) to learn how to add your mod.

## Troubleshooting

If you open `ModTemplate/ModTemplate.csproj`, you'll find references to `$(GameDir)`, `$(OwmlDir)`, and `$(ModUniqueName)`. The value of these variables is read from `ModTemplate/ModTemplate.csproj.user`.

`$(GameDir)` is used to find references to the needed dll files in `$(GameDir)\OuterWilds_Data\Managed\**.dll`. If you are having problems with missing references (yellow exclamation mark warning icon in Visual Studio reference list), you should double-check your `csproj.user` file, or find the references manually (Right click References in Solution Explorer, select "Add References").

`$(OwmlDir)` and `$(ModUniqueName)` are used in the post-build events, to copy the built mod files (and static files like `manifest.json` and `default-config.json`) to the mod directory in `"$(OwmlDir)\Mods\$(ModUniqueName)"`. If you are having problems with post-build events, you can edit them manually in Visual Studio (double click Properties in Solution Explorer, select "Build Events").

You'll also find references to `$(TargetPath)`, which is the path to where Visual Studio places your mod dll after building, and `$(ProjectDir)`, the path with your mod's Visual Studio project. These don't need to be defined manually, they always exist.
