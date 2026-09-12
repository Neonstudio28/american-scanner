# Asset trust boundary

Runtime-loaded JavaScript and model assets are part of the scanner's trusted execution path. Changes to CDN scripts, model files, or generated HTML should therefore receive the same review attention as application code.

Do not silently replace a pinned dependency or external script with an unrelated host. Record intentional origin changes in the release notes.
