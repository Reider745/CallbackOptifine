# CallbackOptifine

Нативный мод для inner core 1.16.201.41, направлен на повышение стабильности inner core

* Список оптимизаций от мода
  * Отключение неиспользуемых иннером кэлбеков
    * GenerateBiomeMap
    * PreProcessChunk
    * GenerateChunkUniversal
    * PostProcessChunk
    * GenerateChunk
    * EntityAddedLocal
    * EntityRemovedLocal

## Сборка проекта

* Проект использует [toolchain](https://github.com/zheka2304/innercore-mod-toolchain)
  * 1. Добавьте файлы с репозитория в проект toolchain(настройте для использования TypeScript, Java, c++)
  * 2. Используйте таск Select Project(выбирете CallbackOptifine)
  * 3. Используйте таск Build, для сборки проекта
