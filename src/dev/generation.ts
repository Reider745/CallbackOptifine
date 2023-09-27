registerDisabledCallback("GenerateBiomeMap", 1, "onBiomeMapGenerated");
registerDisabledCallback(["PreProcessChunk", "GenerateChunkUniversal"], 1, "onPreChunkPostProcessed");
registerDisabledCallback(["PostProcessChunk", "GenerateChunk", "GenerateChunkUniversal"], 1, "onChunkPostProcessed");