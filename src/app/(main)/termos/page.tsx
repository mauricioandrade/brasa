export default function TermosPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="font-display text-4xl text-white mb-8">Termos de Uso</h1>

      <div className="flex flex-col gap-8 text-white/70 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">1. Aceitação</h2>
          <p>
            Ao acessar o Brasa, você concorda com estes Termos de Uso. O Brasa é um bolão de
            entretenimento sem fins lucrativos associado à Copa do Mundo 2026.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">2. Elegibilidade</h2>
          <p>
            O serviço está disponível para qualquer pessoa com conta Google ou GitHub válida. Ao se
            cadastrar, você confirma que tem pelo menos 18 anos ou que possui autorização de um
            responsável legal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">3. Uso adequado</h2>
          <p>
            Você concorda em usar o Brasa apenas para fins lícitos e de entretenimento. É proibido
            tentar manipular o sistema de pontuação, usar bots ou scripts automatizados, ou
            interferir no funcionamento da plataforma.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">4. Prêmios</h2>
          <p>
            Os prêmios exibidos no Brasa são oferecidos voluntariamente pelos organizadores e não
            constituem aposta, sorteio ou loteria. A distribuição de prêmios depende da
            disponibilidade e critério dos organizadores.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">5. Limitação de responsabilidade</h2>
          <p>
            O Brasa é fornecido &quot;como está&quot;, sem garantias de disponibilidade
            ininterrupta. Não nos responsabilizamos por eventuais erros no sistema de pontuação
            decorrentes de dados incorretos fornecidos por APIs de terceiros.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">6. Alterações</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações
            relevantes serão comunicadas via e-mail ou aviso na plataforma.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-verde-500 mb-3">7. Lei aplicável</h2>
          <p>
            Estes termos são regidos pelas leis brasileiras, em especial o Código de Defesa do
            Consumidor e a Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
        </section>

        <p className="text-white/30 text-sm border-t border-white/5 pt-6">
          Última atualização: junho de 2026
        </p>
      </div>
    </main>
  )
}
