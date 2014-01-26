tm
==

A Node-based file templating tool

Subcommands
----------

Subcommands are invoked similar to git: ```tm <subcommand> <template_name> <parameters>```.
Here's a list of the subcommands
+ ```tm render``` : Renders the provided template with the provided parameters. Outputs to stdout.
+ ```tm edit``` : Opens up the template provided in your text editor (given by ```$EDITOR```), creating it if it doesn't exist.
+ ```tm delete``` : Removes the template provided, if it exists. It will prompt you, of course.
