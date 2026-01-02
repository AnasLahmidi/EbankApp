import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Shield, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';

const loginSchema = z.object({
  username: z.string().min(1, 'Nom d\'utilisateur requis'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.login({
        username: formData.username,
        password: formData.password,
      });
      login(response);
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue, ${response.user.prenom || response.user.username} !`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description: error instanceof Error ? error.message : 'Identifiants incorrects',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function for testing
  const handleDemoLogin = (role: 'CLIENT' | 'ADMIN' | 'AGENT') => {
    const demoUsers = {
      CLIENT: { id: 1, username: 'client1', email: 'client@ebank.ma', role: 'CLIENT' as const, nom: 'Alaoui', prenom: 'Mohamed' },
      ADMIN: { id: 2, username: 'admin1', email: 'admin@ebank.ma', role: 'ADMIN' as const, nom: 'Bennani', prenom: 'Sara' },
      AGENT: { id: 3, username: 'agent1', email: 'agent@ebank.ma', role: 'AGENT' as const, nom: 'Amrani', prenom: 'Youssef' },
    };

    login({ token: 'demo-token', user: demoUsers[role] });
    toast({
      title: 'Mode Démo',
      description: `Connecté en tant que ${role}`,
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 sidebar-gradient p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/20" />
          <div className="absolute -left-20 bottom-20 w-60 h-60 rounded-full bg-white/10" />
          <div className="absolute right-40 bottom-40 w-40 h-40 rounded-full bg-white/15" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">eBank</h1>
          </div>
          <p className="text-white/80 text-lg">Votre banque digitale de confiance</p>
        </div>

        <div className="relative space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Gérez vos finances<br />en toute sécurité
            </h2>
            <p className="text-white/70 text-lg max-w-md">
              Accédez à vos comptes, effectuez des virements et suivez vos transactions 24h/24.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm">
              <Lock className="w-4 h-4" />
              Connexion sécurisée
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm">
              <Shield className="w-4 h-4" />
              Données protégées
            </div>
          </div>
        </div>

        <div className="relative text-white/60 text-sm">
          © 2024 eBank. Tous droits réservés.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-primary">eBank</h1>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Connexion</h2>
            <p className="text-muted-foreground mt-2">
              Entrez vos identifiants pour accéder à votre espace
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label className="label-banking">Nom d'utilisateur</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register('username')}
                  type="text"
                  placeholder="votre.identifiant"
                  className="input-banking pl-12"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="label-banking">Mot de passe</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input-banking pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 btn-primary-gradient text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Connexion...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Mode démo - Accès rapide
            </p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('CLIENT')}
                className="text-xs"
              >
                Client
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('AGENT')}
                className="text-xs"
              >
                Agent
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('ADMIN')}
                className="text-xs"
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
