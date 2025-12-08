import { useState } from "react";
import { Upload, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AIFeatures = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/ai/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Analysis failed");

      const data = await response.json();
      setResult(data);
      toast.success("Analysis Complete!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze image. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Smart Fabric Analysis
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload a photo of your clothes. Our AI will detect stains, damages, or fabric type.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Upload Section */}
          <Card className="p-6 border-2 border-dashed border-input hover:border-primary/50 transition-colors">
            <div
              className={`min-h-[300px] flex flex-col items-center justify-center gap-4 text-center cursor-pointer ${preview ? "bg-muted/30" : ""
                }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full h-full flex items-center justify-center p-2"
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-[300px] rounded-lg shadow-md object-contain"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 rounded-full h-8 w-8 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2 p-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Click to Upload</h3>
                      <p className="text-sm text-muted-foreground">
                        or drag and drop your image here
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              className="w-full mt-4"
              size="lg"
              disabled={!file || loading}
              onClick={handleAnalyze}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Scan with AI"
              )}
            </Button>
          </Card>

          {/* Result Section */}
          <div className="space-y-6">
            <div className="prose dark:prose-invert">
              <h3 className="text-2xl font-semibold mb-4">Analysis Results</h3>
              {!result ? (
                <div className="h-[200px] flex items-center justify-center rounded-lg border bg-muted/30 text-muted-foreground">
                  <p>Upload an image to see analysis here</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card className="p-6 border-l-4 border-l-primary shadow-md">
                    <div className="flex items-start gap-4">
                      {result.detected_defect === "Normal" ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-yellow-500 mt-1" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                          Detected Condition
                        </p>
                        <h2 className="text-3xl font-bold mt-1 text-primary capitalize">
                          {result.detected_defect}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2">
                          Confidence: {result.confidence}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-secondary/10 border-none">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Recommended Action
                    </p>
                    <p className="text-lg font-medium">{result.recommendation}</p>

                    <div className="mt-6 flex gap-3">
                      <Button onClick={() => navigate("/schedule")} className="flex-1">
                        Book this Service
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/services")} className="flex-1">
                        View Pricing
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeatures;
