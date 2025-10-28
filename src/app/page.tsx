'use client';

import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle,
  Clock,
  Receipt,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PageHome() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-5xl font-bold text-primary md:text-6xl">
            Gerencie clientes e cobranças com agilidade
          </h1>
          <p className="text-xl text-muted-foreground">
            Simplifique seus pagamentos com segurança e automação completa
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => router.push('/auth/register')}
            >
              Começar agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/auth/login')}
            >
              Fazer login
            </Button>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          Como funciona
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <Users className="mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-2 text-xl font-semibold">Cadastre clientes</h3>
              <p className="text-muted-foreground">
                Adicione e gerencie seus clientes de forma simples e organizada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Receipt className="mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-2 text-xl font-semibold">Crie cobranças</h3>
              <p className="text-muted-foreground">
                Gere cobranças via Pix, Cartão ou Boleto com poucos cliques
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <TrendingUp className="mb-4 h-12 w-12 text-accent" />
              <h3 className="mb-2 text-xl font-semibold">
                Acompanhe pagamentos
              </h3>
              <p className="text-muted-foreground">
                Monitore em tempo real o status de todas as suas transações
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Por que escolher o PaySystem?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-4">
              <Shield className="h-8 w-8 shrink-0 text-accent" />
              <div>
                <h3 className="mb-2 font-semibold">Segurança</h3>
                <p className="text-sm text-muted-foreground">
                  Seus dados e transações protegidos com as melhores práticas do
                  mercado
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle className="h-8 w-8 shrink-0 text-accent" />
              <div>
                <h3 className="mb-2 font-semibold">Simplicidade</h3>
                <p className="text-sm text-muted-foreground">
                  Interface intuitiva e fácil de usar, sem complicações
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-8 w-8 shrink-0 text-accent" />
              <div>
                <h3 className="mb-2 font-semibold">Automação</h3>
                <p className="text-sm text-muted-foreground">
                  Automatize processos e economize tempo precioso
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-primary py-12 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">PaySystem</h3>
              <p className="text-sm opacity-80">
                Simplificando pagamentos para empresas de todos os tamanhos
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Produto</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Funcionalidades</li>
                <li>Preços</li>
                <li>Segurança</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Empresa</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Sobre nós</li>
                <li>Contato</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Termos de uso</li>
                <li>Política de privacidade</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            © 2025 PaySystem. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
