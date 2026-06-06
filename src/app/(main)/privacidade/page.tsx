export default function PrivacidadePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl text-white mb-8">Política de Privacidade</h1>

      <div className="flex flex-col gap-8 text-white/70 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">1. Dados que coletamos</h2>
          <p>
            Ao acessar o Brasa com sua conta Google ou GitHub, coletamos seu nome, endereço de
            e-mail e foto de perfil fornecidos pelo provedor de autenticação. Esses dados são
            necessários para criar e identificar sua conta no bolão.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">2. Como usamos seus dados</h2>
          <p>
            Seus dados são usados exclusivamente para operar o bolão: exibir seu perfil, registrar
            palpites, calcular pontuação e gerar o ranking. Não compartilhamos seus dados com
            terceiros nem os usamos para fins publicitários.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">3. Cookies</h2>
          <p>
            Utilizamos cookies de sessão estritamente necessários para manter você autenticado.
            Também armazenamos no localStorage sua preferência sobre o aviso de cookies.
            Não utilizamos cookies de rastreamento ou publicidade.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">4. Seus direitos (LGPD)</h2>
          <p>
            Nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a
            acessar, corrigir ou excluir seus dados pessoais a qualquer momento. Para excluir sua
            conta e todos os dados associados, acesse seu{' '}
            <a
              href="/perfil"
              className="text-verde-500 underline underline-offset-2 hover:text-verde-400 transition-colors"
            >
              perfil
            </a>{' '}
            e clique em &quot;Excluir conta&quot;.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">5. Retenção de dados</h2>
          <p>
            Seus dados são mantidos enquanto sua conta estiver ativa. Ao excluir a conta, todos os
            seus dados pessoais, palpites e histórico são removidos permanentemente de nossos
            servidores no prazo de até 30 dias.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">6. Contato</h2>
          <p>
            Em caso de dúvidas sobre esta política ou sobre seus dados, entre em contato pelo
            e-mail <span className="text-white/90">privacidade@brasa.app</span>.
          </p>
        </section>

        <p className="text-white/30 text-sm border-t border-white/5 pt-6">
          Última atualização: junho de 2026
        </p>
      </div>
    </main>
  )
}
