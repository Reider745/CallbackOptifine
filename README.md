# Optifine callback

Native mod for the inner core 1.16.201.41, aimed at increasing the stability of the inner core

* List of optimizations from the mod
  * Disable callbacks not used by the inner
    * GenerateBiomeMap
    * PreprocessChunk
    * GenerateChunkUniversal
    * PostprocessChunk
    * GenerateChunk
    * EntityAddedLocal
    * EntityRemovedLocal

## Building the project

* The project uses [toolchain](https://github.com/zheka2304/innercore-mod-toolchain)
  * 1. Add the repository files to the project toolchain (for using TypeScript, Java, C++)
  * 2. Use the Select Project task (select CallbackOptifine).
  * 3. Use the Build task to build the project.
  