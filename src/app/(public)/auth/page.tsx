import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "@/utils/forms/sign-in.form";
import { SignUpForm } from "@/utils/forms/sign-up.form";
import { Brain, Sparkles, Zap } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Description and AI illustration */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 text-white">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CopyAI Pro
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight">
                Generate Persuasive Copy with{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Artificial Intelligence
                </span>
              </h2>

              <p className="text-xl text-slate-300 leading-relaxed">
                Effortlessly generate persuasive copy using natural language
                prompts and artificial intelligence. Transform your ideas into
                compelling marketing content in seconds.
              </p>
            </div>

            <div className="flex items-center space-x-6 text-slate-400">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>

          {/* Abstract AI illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-16 rounded-lg bg-gradient-to-br ${
                      i % 3 === 0
                        ? "from-blue-500/30 to-blue-600/30"
                        : i % 3 === 1
                          ? "from-purple-500/30 to-purple-600/30"
                          : "from-pink-500/30 to-pink-600/30"
                    } border border-slate-600/30 animate-pulse`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Authentication forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 shadow-2xl shadow-purple-500/10">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4 lg:hidden">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Welcome to CopyAI Pro
              </CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 border-slate-600">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <SignInForm />
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Mobile description */}
          <div className="lg:hidden mt-8 text-center text-slate-300">
            <p className="text-sm">
              Effortlessly generate persuasive copy using natural language
              prompts and artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
