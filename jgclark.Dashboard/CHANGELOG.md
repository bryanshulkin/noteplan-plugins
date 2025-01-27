# What's changed in 🎛 Dashboard plugin?
For more details see the [plugin's README](https://github.com/NotePlan/plugins/tree/main/jgclark.Dashboard/).

## [0.6.0] - 2023-08-???
### Added
- adds tooltip on displayed tasks that allows task to be moved on to next day (`+1d`), next business day (`+1b`), this week's note (`wk`), next week's note (`+1w`). (If you're wondering, this uses the same syntax as my Repeat Extensions plugin.)
- now truncates very long task/checklist items in the display
- new setting 'Add dashboard auto-update trigger when dashboard opened?' that controls whether to add the auto-update trigger to the frontmatter to the current note when the dashboard is opened
- new setting 'Exclude tasks that include time blocks?' that controls whether to stop display of open tasks that contain a time block
- new setting 'Exclude checklists that include time blocks?' that controls whether to stop display of open checklists that contain a time block
- support for new NP theme item 'working-on' (invoked with a `>>` at the start of a task or checklist line)
- support for coloured (and curved) backgrounds on #tags, @mentions, priority highlights, `code` fragments and ==highlights== (if set in the theme).

### Changed
- (finally) **found a way for the very latest updates to be available to display, when using the auto-update trigger**
- the auto-update trigger should now fire when an open task/checklist is edited, not just added
- now ignores open tasks/checklists that are in the relevant calendar note, but have a scheduled `>date`
- now will bring the Dashboard window to the front if run from the command bar or an x-callback, but will not take focus if it updates itself via a`` trigger.
- better translation of NP theme vertical spacing to the HTML display
- now hides the !, !!, !!! or >> 'priority markers'

### Fixed
- background of tasks with !! or !!! priority markers sometimes wrong
- tasks that include x-callbacks can now be checked off in the dashboard

## [0.5.1] - 2023-07-21 (unreleased)
### Added
- tasks including markdown bold and italic text are now styled appropriately
- embedded images in tasks are now replaced with an icon
- new 'hover' effect over the todo circle and checklist square, to help hint that clicking will complete it (or command-click will cancel it).

### Fixed
- lots of edge cases ???
- 'Filter ...' checkbox

## [0.5.0] - 2023-07-14
### Added
- update open icon to completed or cancelled, as it disappears in the animation.

## [0.5.0-b3] - 2023-07-14 (not released)
### Added
- new optional section that displays all open tasks/checklists that contains a #tag or @mention that you can set in the optional new setting '#tag/@mention to show'. This is one way of showing all `#next` actions, for example.
- you can now also **cancel** an open task or checklist by pressing ⌘ (Command) when clicking on the open circle or square.
<!-- ### Changed
- changed message passing to use single object not multiple params
- better handling of strange punctuation in tasks and filenames -->

## [0.5.0-b2] - 2023-05-31 (not released)
### Changed
- tweaked layout of multi-column view to avoid most examples of a single item being split across two columns. (I can't find a way to avoid some cases.)
- will now re-display lower priority tasks when the last higher priority one has been completed.

## [0.5.0-b1] - 2023-06-28 (not released)
### Added
- new UI toggle "Filter out lower-priority items?": If set then items without any extra priority in calendar files will be hidden until there are no remaining priority items that haven't been completed. Priority items are currently indicated by having !!!, !! or ! at the beginning or end of the item.

## [0.4.2] - 2023-05-16
### Added
- now shows 'add task' and 'add checklist' icons, to allow you to add a task directly at the start of the current daily/weekly/monthly/quarterly note
    <img src="add-buttons@2x.png" width="200px">
- it now takes into account user's preferences for whether `*`, `-` and/or `1.` counts as the indicator for todos
- it now saves the size and location of the Dashboard window when you move or resize it, and reuses it when you re-open it, or refresh it. (Requires NP v3.9.1+)
### Changed
- when the dashboard window is refreshed in the background by a trigger, it will no longer 'steal focus' by bringing the window to the front.
- the cursor now changes when over the open task circle or checklist square, to help indicate it can be clicked

## [0.4.1] - 2023-04-16
- fixed bug reported by @csdlajolle
- minor tweaks to column 1 display
- get /demo version of this up to date with new "Show referenced items in separate section?" setting.

## [0.4.0] - 2023-04-08 (first public release)
### Added
- supports open items in quarterly notes too
- new setting "Show referenced items in separate section?" This controls whether to show Today's open tasks and checklists in two separate sections: first from the daily note itself, and second referenced from project notes.\nThe same also goes for Weekly/Monthly/Quarterly notes.

## [0.3.7] - 2023-04-02 (private beta 5)
### Fixed
- regression resulting from new settings 'excluded folders'

## [0.3.6] - 2023-04-02 (private beta 4)
### Added
- new setting 'Folders to ignore when finding linked items' which can help if you have sync'd lines in Saved Searches.
- added links to section titles (e.g. "This Week")
### Fixed
- note links in the 3rd section opened the wrong notes

## [0.3.5] - 2023-04-01 (private beta 3)
### Added
- now shows items from monthly notes as well (for @fulcanelli and @bullseye)
- now suppresses empty sections if there aren't any open tasks in it (apart from the current daily note, where it will still show a congratulatory message)
<!-- split out CSS to a separate file -->
### Fixed
- now supports a special font used in Apple Dark and related themes

## [0.3.4] - 2023-03-31 (private beta 2)
### Added
- will now offer to install the required "Shared Resources" plugin if that's not already installed
- new 'window width' and 'window height' settings to set the default width and height the dashboard will use
### Changed
- made the font size slightly larger, to match that of your normal setting in NotePlan windows (for @fulcanelli)

## [0.3.3] - 2023-03-29 (private beta 1)
### Fixed
- some note-links on section 2 and 4

Note: I'm trying to solve a problem when using this with its trigger, that NP hasn't finished updating itself before it re-calculates the Dashboard display.

## [0.3.2] - 2023-03-25
### Changed
- a new way of testing when to refresh the dashboard based on changes in daily/weekly notes. This avoids most false positives.
### Added
- command to edit settings, even on iOS
- new Debug setting for Triggering dashboard refreshes

## [0.3.1] - 2023-03-15
### Added
- when completing a task/checklist in the dashboard, it will now have a @done(...) date added if the user has 'add completion date' setting ticked.
### Fixed
- clicking note links with apostrophes in them

## [0.3.0] 2023-03-11
### Added
- when clicking on a paragraph, it will now highlight the right paragraph in the editor, not just open the note
- will now automatically update the dashboard window when a change is made in the relevant calendar note. (This requires adding `triggers: onEditorWillSave => jgclark.Dashboard.decideWhetherToUpdateDasboard` to the frontmatter of the relevant daily/weekly note.)
- supports multi-column display, when the window is wide enough
- de-dupes items that would appear twice in a list because the lines are sync'd together
- Now updates the totals and counts

## [0.2.0] 2023-02-28  (unreleased)
### Added
- Tasks and Checklist items can now be marked as completed; the underlying NotePlan note is updated, and the item is removed from the list in the window. (Big thanks to @dwertheimer for the clever bi-directional infrastructure that makes this possible.)
- Note: This relies on the new "Shared Resources" plugin to be installed and active.

## [0.1.0] (unreleased)
- first version, providing read-only view of all tasks and checklists due today or this week. Plus list of the next 3 projects to review (if you use the Projects + Reviews plugin.)
