import { DeckBuilder, type ProjectDocument } from '../domain/deckBuilder.ts';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const SLUG = 'java-ddd';
const DECK_DIR = path.join('/home/fabiominsait/estudos/slides/decks', SLUG);
const PUBLIC_DIR = '/home/fabiominsait/estudos/slides/localstudio/apps/editor/public/decks';

export async function createJavaDddPresentation(): Promise<ProjectDocument> {
  const builder = new DeckBuilder('Java Moderno e Domain-Driven Design (DDD)', 'dark-neon');

  // Slide 1: Capa
  builder.addTitleSlide({
    badge: 'ARQUITETURA & ENGENHARIA DE SOFTWARE',
    title: 'Domain-Driven Design no Java Moderno',
    subtitle:
      'Do Design Estratégico aos Tactical Patterns com Java 21+, Records e Arquitetura Limpa',
    author: 'Fábio Brasileiro | Engenharia de Software',
    tags: ['Java21', 'DDD', 'SoftwareArchitecture', 'HexagonalArchitecture', 'CleanCode'],
    notes:
      'Boas-vindas a todos! Nesta apresentação vamos explorar como aplicar os conceitos fundamentais do Domain-Driven Design (DDD) utilizando os recursos modernos do ecossistema Java (Java 17 a 21+), fugindo de modelos anêmicos e garantindo que o software reflita com fidelidade as regras reais do negócio.',
  });

  // Slide 2: Fundamentos
  builder.addCardsSlide({
    badge: 'VISÃO GERAL',
    title: 'A Essência do Domain-Driven Design',
    subtitle: 'Gerenciando a complexidade de software focando no coração do negócio',
    cards: [
      {
        title: 'Complexidade do Negócio',
        highlight: 'Fred Brooks: Essencial vs Acidental',
        description:
          'DDD foca na complexidade essencial (o domínio do negócio), em vez de se perder na complexidade acidental (frameworks, ORMs, bancos de dados e ferramentas).',
        accentColor: '#38BDF8',
      },
      {
        title: 'Linguagem Ubíqua',
        highlight: 'Ubiquitous Language',
        description:
          'Vocabulário único e compartilhado rigorosamente entre especialistas de negócio e desenvolvedores. Se o negócio fala "Estorno", o código nunca deve usar "DeleteTransaction".',
        accentColor: '#34D399',
      },
      {
        title: 'Subdomínios Estratégicos',
        highlight: 'Foco Competitivo',
        description:
          'Core Domain (o diferencial competitivo da empresa), Supporting Domain (apoio específico ao negócio) e Generic Domain (soluções comuns como autenticação e billing).',
        accentColor: '#F59E0B',
      },
    ],
    notes:
      'O ponto mais crucial do DDD não é código ou anotação: é comunicação. A Linguagem Ubíqua elimina a perda de tradução entre a área de negócio e a equipe de engenharia.',
  });

  // Slide 3: Bounded Contexts & Context Mapping
  builder.addSplitSlide({
    badge: 'DESIGN ESTRATÉGICO',
    title: 'Bounded Contexts & Context Mapping',
    subtitle: 'Fronteiras explícitas onde modelos e linguagens têm significado estrito',
    left: {
      title: 'Bounded Contexts (Fronteiras)',
      items: [
        'Modelos não tentam ser globais nem universais na organização inteira.',
        'Um "Cliente" no contexto de Vendas possui carrinho, cupons e intenção de compra.',
        'O mesmo "Cliente" no contexto de Logística é apenas destinatário e endereço de entrega.',
        'Cada Bounded Context possui seu próprio ciclo de vida, banco de dados e codebase isolado.',
      ],
      accentColor: '#38BDF8',
    },
    right: {
      title: 'Padrões de Context Mapping',
      items: [
        'Anti-Corruption Layer (ACL): Protege seu domínio contra modelos legados ou de terceiros.',
        'Shared Kernel: Subconjunto de modelo compartilhado entre times em cooperação estreita.',
        'Customer / Supplier: Relação upstream e downstream com SLA de entrega e dependências.',
        'Open Host Service (OHS): API pública estável com protocolo publicado (REST, gRPC, Kafka).',
      ],
      accentColor: '#34D399',
    },
    notes:
      'Muitos falham no DDD ao tentar criar um "Modelo de Dados Corporativo Único". O segredo é delimitar fronteiras explícitas (Bounded Contexts) e mapear a relação entre eles.',
  });

  // Slide 4: Building Blocks Táticos
  builder.addCardsSlide({
    badge: 'DESIGN TÁTICO',
    title: 'Building Blocks Táticos no Java 21+',
    subtitle: 'Mapeando conceitos de domínio com construções modernas da linguagem',
    cards: [
      {
        title: 'Value Objects (VO)',
        highlight: 'Java Records',
        description:
          'Imutáveis por definição, sem identidade própria, comparados por seus atributos. Perfeitos para CPF, Email, Dinheiro, CEP e Coordenadas geográficas.',
        accentColor: '#38BDF8',
      },
      {
        title: 'Entities',
        highlight: 'Identidade Única',
        description:
          'Objetos que possuem identidade contínua ao longo do tempo. Dois usuários com o mesmo nome e email continuam sendo entidades distintas se seus IDs diferem.',
        accentColor: '#818CF8',
      },
      {
        title: 'Aggregates & Root',
        highlight: 'Fronteira Transacional',
        description:
          'Cluster de entidades e VOs tratados como uma unidade atômica de consistência. Todas as operações externas passam obrigatoriamente pela Aggregate Root.',
        accentColor: '#34D399',
      },
      {
        title: 'Domain Services',
        highlight: 'Lógica Sem Estado',
        description:
          'Lógica de negócio pura que não pertence naturalmente a uma única entidade ou VO (ex: cálculo complexo de taxas ou conversão cambial envolvendo múltiplas contas).',
        accentColor: '#F59E0B',
      },
    ],
    notes:
      'No Java 21+, o "record" é a estrutura definitiva para Value Objects: fornece imutabilidade nativa, equals/hashCode por valor e validação de invariantes no construtor compacto.',
  });

  // Slide 5: Código Prático
  builder.addCodeSlide({
    badge: 'IMPLEMENTAÇÃO EM JAVA',
    title: 'Modelo Rico vs Modelo Anêmico',
    subtitle: 'Invariantes de negócio auto-validadas com Records e Construtores Compactos',
    explanation: [
      'Modelo Anêmico: Apenas getters e setters, lógica espalhada em Services sem controle.',
      'Modelo Rico: O próprio objeto é responsável por garantir suas invariantes de negócio.',
      'Java Record Compact Constructor: Executa validação de invariantes antes da atribuição dos campos.',
      'Never Null / Never Invalid: É impossível instanciar um Money ou CPF inválido na aplicação.',
    ],
    codeTitle: 'Money.java & Order.java (Java 21)',
    code: `// Value Object imutável e auto-validável
public record Money(BigDecimal amount, Currency currency) {
  public Money {
    Objects.requireNonNull(amount, "Amount required");
    Objects.requireNonNull(currency, "Currency required");
    if (amount.compareTo(BigDecimal.ZERO) < 0) {
      throw new DomainValidationException("Valor negativo");
    }
  }

  public Money add(Money other) {
    if (!this.currency.equals(other.currency)) {
      throw new DomainValidationException("Moedas incompatíveis");
    }
    return new Money(this.amount.add(other.amount), this.currency);
  }
}

// Aggregate Root com regras encapsuladas
public class Order {
  private final OrderId id;
  private OrderStatus status = OrderStatus.DRAFT;
  private final List<OrderItem> items = new ArrayList<>();

  public void addItem(Product product, int quantity) {
    if (this.status != OrderStatus.DRAFT) {
      throw new BusinessRuleException("Pedido já fechado");
    }
    this.items.add(new OrderItem(product.id(), quantity));
  }
}`,
    notes:
      'Observem como o record Money impede qualquer instância inválida. Não há necessidade de revalidar "amount != null" em 50 lugares diferentes: se existe um Money, ele é garantidamente válido.',
  });

  // Slide 6: Aggregates & Domain Events
  builder.addSplitSlide({
    badge: 'PADRÕES AVANÇADOS',
    title: 'Aggregates & Domain Events',
    subtitle: 'Consistência transacional e desacoplamento assíncrono entre contextos',
    left: {
      title: 'Regras de Ouro dos Aggregates',
      items: [
        'Modifique apenas UM Aggregate por transação de banco de dados.',
        'Consistência imediata e forte existe apenas DENTRO da fronteira do Aggregate.',
        'Referencie outros Aggregates apenas por identificador (`CustomerId`), nunca por objeto em memória.',
        'Mantenha Aggregates pequenos para evitar concorrência e gargalos de lock em banco.',
      ],
      accentColor: '#38BDF8',
    },
    right: {
      title: 'Domain Events no Java',
      items: [
        'Representam fatos consumados que já aconteceram no domínio (`OrderPlacedEvent`).',
        'Garantem Consistência Eventual entre Aggregates ou Bounded Contexts distintos.',
        'Publicação segura após commit via Outbox Pattern para evitar perda de mensagens.',
        'No Spring Boot 3+: suporte nativo com `@DomainEvents` e `@TransactionalEventListener`.',
      ],
      accentColor: '#34D399',
    },
    notes:
      'A regra de modificar apenas um Aggregate por transação é uma das maiores quebras de paradigma para quem vem do modelo relacional clássico. A comunicação entre Aggregates é assíncrona e orientada a eventos.',
  });

  // Slide 7: Arquitetura Hexagonal
  builder.addArchitectureSlide({
    badge: 'ARQUITETURA DE SOFTWARE',
    title: 'Arquitetura Hexagonal com Spring Boot 3',
    subtitle: 'Isolando o núcleo de negócio puro de frameworks, banco de dados e APIs externas',
    layers: [
      {
        name: 'Apresentação',
        subtitle: 'Inbound Adapters',
        color: '#38BDF8',
        components: [
          'Spring REST Controllers',
          'GraphQL Resolvers',
          'Kafka Event Consumers',
          'Scheduled Batch Jobs',
        ],
      },
      {
        name: 'Aplicação',
        subtitle: 'Inbound Ports & Use Cases',
        color: '#818CF8',
        components: [
          'CreateOrderUseCase',
          'PayInvoiceHandler',
          'DTO Mappers / Records',
          'Transaction Boundaries',
        ],
      },
      {
        name: 'Domínio',
        subtitle: 'Pure Java (Zero Libs)',
        color: '#34D399',
        components: [
          'Order (Aggregate Root)',
          'Money, CPF (Value Objects)',
          'OrderPlacedEvent',
          'OrderRepository (Port)',
        ],
      },
      {
        name: 'Infraestrutura',
        subtitle: 'Outbound Adapters',
        color: '#F59E0B',
        components: [
          'Spring Data JPA / Postgres',
          'Redis Cache Adapter',
          'Kafka Event Publisher',
          'Payment Gateway Client',
        ],
      },
    ],
    notes:
      'Na Arquitetura Hexagonal, a dependência sempre aponta para dentro. O Domínio não importa Spring, JPA, Hibernate nem Jackson: ele é Java puro. A infraestrutura implementa as interfaces (Ports) do domínio.',
  });

  // Slide 8: Resumo & Regras de Ouro
  builder.addSummarySlide({
    badge: 'CONCLUSÃO',
    title: 'Regras de Ouro do DDD com Java',
    subtitle: 'Diretrizes essenciais para o sucesso na modelagem e na engenharia de software',
    takeaways: [
      {
        title: 'Não use DDD para CRUDs simples',
        detail:
          'DDD foi feito para domínios complexos. Telas simples de cadastro funcionam perfeitamente com Active Record ou CRUD clássico sem over-engineering.',
      },
      {
        title: 'Comece pela Linguagem Ubíqua',
        detail:
          'Converse com os especialistas de negócio antes de abrir a IDE. O vocabulário real do domínio molda a estrutura do código.',
      },
      {
        title: 'Abrace os Records no Java Moderno',
        detail:
          'Substitua primitivos soltos por Value Objects tipados e imutáveis. Elimine classes anêmicas e garanta auto-validação em tempo de compilação e execução.',
      },
      {
        title: 'O Domínio Governa a Persistência',
        detail:
          'Modele as entidades para resolver o problema de negócio primeiro; adapte as tabelas do PostgreSQL depois, nunca o inverso.',
      },
    ],
    notes:
      'Para fechar: DDD não é sobre código perfeito ou padrões difíceis; é sobre software que expressa e resolve problemas reais de negócio com clareza e longevidade. Muito obrigado!',
  });

  return builder.build();
}

async function run() {
  console.log('Construindo apresentação "Java Moderno e DDD"...');
  const project = await createJavaDddPresentation();

  // Salvar no diretório de projetos local
  await fs.mkdir(DECK_DIR, { recursive: true });
  await fs.mkdir(path.join(DECK_DIR, 'assets'), { recursive: true });
  await fs.mkdir(path.join(DECK_DIR, 'fonts'), { recursive: true });
  await fs.mkdir(path.join(DECK_DIR, 'recordings'), { recursive: true });

  await fs.writeFile(
    path.join(DECK_DIR, 'project.json'),
    JSON.stringify(project, null, 2),
    'utf-8',
  );

  await fs.writeFile(
    path.join(DECK_DIR, 'localstudio.json'),
    JSON.stringify(
      {
        schemaVersion: 1,
        projectName: project.name,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
      null,
      2,
    ),
    'utf-8',
  );

  // Exportar para public/decks/java-ddd.json
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  const sharePayload = {
    schemaVersion: 1,
    shareId: SLUG,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    project,
  };
  await fs.writeFile(
    path.join(PUBLIC_DIR, `${SLUG}.json`),
    JSON.stringify(sharePayload, null, 2),
    'utf-8',
  );

  console.log(`✅ Apresentação gerada com sucesso com ${project.pages.length} slides!`);
  console.log(`📁 Projeto salvo em: ${DECK_DIR}`);
  console.log(`🌐 Export web salvo em: ${path.join(PUBLIC_DIR, `${SLUG}.json`)}`);
  console.log(`🔗 Link do Editor: http://localhost:4173/editor/?src=/editor/decks/${SLUG}.json`);
  console.log(
    `🔗 Link do Player: http://localhost:4173/editor/?share=${SLUG}&src=/editor/decks/${SLUG}.json`,
  );
}

run().catch((err) => {
  console.error('Erro na geração:', err);
  process.exit(1);
});
