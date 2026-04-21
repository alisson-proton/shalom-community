import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post, PostType, Visibility, Media, Comment } from '../models/post.model';
import { User, UserRole } from '../models/user.model';
import { CalendarEvent, CalendarEventType } from '../models/calendar-event.model';
import { Ministry, MinistryMember, MinistrySchedule } from '../models/ministry.model';
import { SmallGroup, SmallGroupMember } from '../models/small-group.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private selectedFilter$ = new BehaviorSubject<string>('all');

  get filterChanges() {
    return this.selectedFilter$.asObservable();
  }

  setFilter(filter: string): void {
    this.selectedFilter$.next(filter);
  }

  getCurrentFilter(): string {
    return this.selectedFilter$.getValue();
  }

  private posts: Post[] = [
    {
      id: '9',
      title: 'CULTO DE HOJE! 19/04/2026 ',
      content: 'Não importa o que você fez. Não importa onde você você esteve. Jesus é por você e nós também!',
      type: PostType.SERMON,
      visibility: Visibility.PUBLIC,
      media: [],
      authorName: 'Worship Team',
      createdAt: new Date('2026-04-19'),
      tags: ['worship', 'youtube', 'live'],
      likes: 73,
      likedByUsers: [],
      commentsList: [
        { id: 'c1', authorName: 'João Membro', content: 'Que culto abençoado!', createdAt: new Date('2026-04-19') },
        { id: 'c2', authorName: 'Maria Silva', content: 'Glória a Deus! 🙌', createdAt: new Date('2026-04-19') }
      ],
      externalUrl: 'https://www.youtube.com/watch?v=m3T5pzuU0iw'
    },
    {
      id: '9',
      title: 'Venceu a morte (Death mas arrested) | North Point Church | Shalom MSC',
      content: 'Não importa o que você fez. Não importa onde você você esteve. Jesus é por você e nós também!',
      type: PostType.EVENT,
      visibility: Visibility.PUBLIC,
      media: [],
      authorName: 'Worship Team',
      createdAt: new Date('2026-03-20'),
      tags: ['worship', 'youtube', 'live'],
      likes: 73,
      likedByUsers: [],
      commentsList: [
        { id: 'c1', authorName: 'João Membro', content: 'Que culto abençoado!', createdAt: new Date('2026-03-20') },
        { id: 'c2', authorName: 'Maria Silva', content: 'Glória a Deus! 🙌', createdAt: new Date('2026-03-20') }
      ],
      externalUrl: 'https://www.youtube.com/watch?v=Irwt0GsJILc'
    },
    {
      id: '9',
      title: 'O que é quebrantamento?',
      content: 'Não importa o que você fez. Não importa onde você você esteve. Jesus é por você e nós também!',
      type: PostType.SERMON,
      visibility: Visibility.PUBLIC,
      media: [],
      authorName: 'Worship Team',
      createdAt: new Date('2026-01-5'),
      tags: ['worship', 'youtube', 'live'],
      likes: 73,
      likedByUsers: [],
      commentsList: [
        { id: 'c1', authorName: 'João Membro', content: 'Que culto abençoado!', createdAt: new Date('2026-01-5') },
        { id: 'c2', authorName: 'Maria Silva', content: 'Glória a Deus! 🙌', createdAt: new Date('2026-01-5') }
      ],
      externalUrl: 'https://www.youtube.com/watch?v=La-sUfy9jE8'
    },
    {
      id: '10',
      title: 'Londrina precisa ser amada.\nVamos transformar Londrina através da vida de Cristo em nós! 🧡',
      content: 'E como vamos fazer isso?\nNossos grupos espalhados por Londrina são ambientes preparados para acolher, amar e fazer com que as pessoas tenham um verdadeiro encontro com Jesus.\nPor isso, nós vamos fazer sempre uma vez mais\nNós vamos, amar, perdoar, discipular e servir uma vez mais\nNós vamos, orar, jejuar, evangelizar e adorar uma vez mais\nNós vamos, ser igreja, ser família, ser comunidade uma vez mais\nSomos uma igreja de pessoas imperfeitas que estão em constante transformação e você está convidado para fazer parte dessa missão e sonhar junto com a gente o que Deus plantou em nossos corações\nClique no link ou mande uma mensagem para fazer conhecer mais nossa comunidade e nossos grupos\nVocê não pode ficar de fora!',
      type: PostType.GALLERY,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm10',
        url: '/post6.jpg',
        type: 'image',
        description: 'Comunidade Shalom Londrina'
      }],
      authorName: 'Equipe de Mídia',
      createdAt: new Date('2026-04-17'),
      tags: ['instagram', 'comunidade', 'grupos'],
      likes: 96,
      likedByUsers: [],
      commentsList: [
        { id: 'c3', authorName: 'Ana Costa', content: 'Londrina precisa disso!', createdAt: new Date('2026-04-17') }
      ],
      externalUrl: 'https://www.instagram.com/comunidadeshalom_/reel/CvdaG7SJY9V/'
    },
    {
      id: '1',
      title: 'Domingo de santa ceia!',
      content: 'Venha celebrar a santa ceia conosco nesse domingo!',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm1',
        url: '/post7.jpg',
        type: 'image',
        description: 'Reunião da comunidade'
      }],
      authorName: 'Pastor João',
      createdAt: new Date('2026-04-15'),
      tags: ['santa-ceira', 'comunidade'],
      likes: 80,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '1',
      title: 'Festa no céu!',
      content: 'Domingo de batismo, é festa no céu!',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm1',
        url: '/post5.jpg',
        type: 'image',
        description: 'Reunião da comunidade'
      }],
      authorName: 'Pastor João',
      createdAt: new Date('2026-04-15'),
      tags: ['boas-vindas', 'comunidade'],
      likes: 45,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '2',
      title: 'Um ano repleto de alegria em Jesus!!',
      content: '2025 foi glorioso, e 2026 será ainda mais incrível. Que você e sua família possam viver o melhor de Deus nesse ano que está por vir✨🙌🏼',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm2',
        url: '/post1.jpg',
        type: 'image',
        description: 'Gravação do culto de domingo'
      }],
      authorName: 'Pastor João',
      createdAt: new Date('2026-01-01'),
      tags: ['anonovo', 'fé', 'Jesus'],
      likes: 950,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '3',
      title: 'Curso Descubra',
      content: 'Novo curso de 8 semanas começando no próximo mês. Mergulho profundo no Livro de Gênesis com sessões interativas e discussões. Somente para membros.',
      type: PostType.COURSE,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm3',
        url: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800',
        type: 'image',
        description: 'Materiais de estudo bíblico'
      }],
      authorName: 'Professora Sara',
      createdAt: new Date('2026-04-12'),
      tags: ['curso', 'estudo-bíblico', 'gênesis'],
      likes: 67,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '5',
      title: 'Fotos do Ministério de Jovens',
      content: 'Momentos incríveis do nosso retiro do ministério de jovens no último fim de semana. Que bênção!',
      type: PostType.GALLERY,
      visibility: Visibility.MEMBERS_ONLY,
      media: [
        {
          id: 'm5a',
          url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800',
          type: 'image',
          description: 'Atividade do grupo de jovens 1'
        },
        {
          id: 'm5b',
          url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
          type: 'image',
          description: 'Atividade do grupo de jovens 2'
        },
        {
          id: 'm5c',
          url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
          type: 'image',
          description: 'Atividade do grupo de jovens 3'
        }
      ],
      authorName: 'Líder de Jovens Miguel',
      createdAt: new Date('2026-04-08'),
      tags: ['galeria', 'jovens', 'retiro'],
      likes: 56,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '6',
      title: 'Pedido de Oração - Apoio da Comunidade',
      content: 'Vamos nos unir em oração pelos membros da nossa comunidade que enfrentam desafios. Membros podem compartilhar pedidos específicos de oração nos comentários.',
      type: PostType.PRAYER,
      visibility: Visibility.MEMBERS_ONLY,
      media: [{
        id: 'm6',
        url: 'https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?w=800',
        type: 'image',
        description: 'Mãos em oração'
      }],
      authorName: 'Ministério de Oração',
      createdAt: new Date('2026-04-07'),
      tags: ['oração', 'apoio'],
      likes: 78,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '7',
      title: 'Você é nosso convidado para o Culto de Páscoa, dia 05 de abril ✨',
      content: 'A Páscoa não é só uma data… é vida, é alegria, é celebração!\nAquilo que parecia o fim se transformou em um novo começo e essa verdade continua viva hoje.\n\nQueremos viver isso juntos 💛\nConvide sua família, chama seus amigos e vem celebrar com a gente uma noite cheia de esperança e fé.',
      type: PostType.EVENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm7',
        url: '/post4.jpg',
        type: 'image',
        description: 'Caixas de doação de alimentos'
      }],
      authorName: 'Equipe de Ação Social',
      createdAt: new Date('2026-04-05'),
      tags: ['páscoa', 'evento', 'celebração'],
      likes: 92,
      likedByUsers: [],
      commentsList: []
    },
    {
      id: '9',
      title: 'Atencão!',
      content: 'A partir do dia 04/01, retornamos com nossos encontros às 10h30, e continuamos com os encontros às 19h! ✨\nEsperamos você para vivermos tudo o que Deus tem preparado! 🤍🙏',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm8',
        url: '/post2.jpg',
        type: 'image',
        description: 'Banda de adoração'
      }],
      authorName: 'Equipe de Adoração',
      createdAt: new Date('2025-12-31'),
      tags: ['culto', 'horário', 'anúncio'],
      likes: 110,
      likedByUsers: [],
      commentsList: []
    }
    ,
    {
      id: '10',
      title: 'Vigilia!',
      content: '',
      type: PostType.ANNOUNCEMENT,
      visibility: Visibility.PUBLIC,
      media: [{
        id: 'm8',
        url: '/post3.jpg',
        type: 'image',
        description: 'Banda de adoração'
      }],
      authorName: 'Equipe de Adoração',
      createdAt: new Date('2026-01-27'),
      tags: ['adoração', 'evento', 'vigilia'],
      likes: 110,
      likedByUsers: [],
      commentsList: []
    }
  ];

  private currentUser: User | null = null;

  private members: User[] = [
    { id: 'u1',  name: 'João Membro',       email: 'member@shalom.com',   role: UserRole.MEMBER, isMember: true,  ministries: ['louvor'],      phone: '(43) 99001-0001', address: 'Rua das Flores, 10',    neighborhood: 'Centro',           city: 'Londrina', birthDate: '1990-03-15' },
    { id: 'u2',  name: 'Administrador',      email: 'admin@shalom.com',    role: UserRole.ADMIN,  isMember: true,  ministries: ['staff'],       phone: '(43) 99001-0002', address: 'Av. Brasil, 500',        neighborhood: 'Gleba Palhano',    city: 'Londrina', birthDate: '1985-07-22' },
    { id: 'u3',  name: 'Ana Paula Melo',     email: 'ana@shalom.com',      role: UserRole.MEMBER, isMember: true,  ministries: ['intercessão'], phone: '(43) 99001-0003', address: 'Rua XV de Novembro, 88', neighborhood: 'Centro',           city: 'Londrina', birthDate: '1993-11-05' },
    { id: 'u4',  name: 'Carlos Henrique',    email: 'carlos@shalom.com',   role: UserRole.MEMBER, isMember: true,  ministries: ['louvor'],      phone: '(43) 99001-0004', address: 'Rua Pará, 220',          neighborhood: 'Jardim Shangrilá', city: 'Londrina', birthDate: '1988-01-30' },
    { id: 'u5',  name: 'Fernanda Lima',      email: 'fernanda@shalom.com', role: UserRole.MEMBER, isMember: true,  ministries: ['louvor'],      phone: '(43) 99001-0005', address: 'Rua Sergipe, 45',        neighborhood: 'Jardim Shangrilá', city: 'Londrina', birthDate: '1991-06-18' },
    { id: 'u6',  name: 'Rafael Almeida',     email: 'rafael@shalom.com',   role: UserRole.MEMBER, isMember: true,  ministries: [],              phone: '(43) 99001-0006', address: 'Av. Tiradentes, 980',    neighborhood: 'Gleba Palhano',    city: 'Londrina', birthDate: '1996-09-12' },
    { id: 'u7',  name: 'Vanessa Cardoso',    email: 'vanessa@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['intercessão'], phone: '(43) 99001-0007', address: 'Rua Dom Pedro II, 310',  neighborhood: 'Centenário',       city: 'Londrina', birthDate: '1987-04-25' },
    { id: 'u8',  name: 'Pedro Costa',        email: 'pedro@shalom.com',    role: UserRole.MEMBER, isMember: true,  ministries: [],              phone: '(43) 99001-0008', address: 'Rua das Flores, 142',    neighborhood: 'Jardim Shangrilá', city: 'Londrina', birthDate: '1984-12-03' },
    { id: 'u9',  name: 'Mariana Costa',      email: 'mariana@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['recepção'],    phone: '(43) 99001-0009', address: 'Rua Minas Gerais, 77',   neighborhood: 'Centro',           city: 'Londrina', birthDate: '1995-08-14' },
    { id: 'u10', name: 'Lucas Ferreira',     email: 'lucas@shalom.com',    role: UserRole.MEMBER, isMember: true,  ministries: ['recepção'],    phone: '(43) 99001-0010', address: 'Rua Espírito Santo, 33', neighborhood: 'Centenário',       city: 'Londrina', birthDate: '1997-02-27' },
    { id: 'u11', name: 'Patricia Oliveira',  email: 'patricia@shalom.com', role: UserRole.MEMBER, isMember: true,  ministries: ['recepção'],    phone: '(43) 99001-0011', address: 'Av. Saul Elkind, 200',   neighborhood: 'Warta',            city: 'Londrina', birthDate: '1989-05-09' },
    { id: 'u12', name: 'Anderson Reis',      email: 'anderson@shalom.com', role: UserRole.MEMBER, isMember: true,  ministries: ['mídia'],       phone: '(43) 99001-0012', address: 'Rua Goiás, 15',          neighborhood: 'Jardim Shangrilá', city: 'Londrina', birthDate: '1992-10-21' },
    { id: 'u13', name: 'Beatriz Alves',      email: 'beatriz@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['mídia'],       phone: '(43) 99001-0013', address: 'Rua Maranhão, 60',       neighborhood: 'Gleba Palhano',    city: 'Londrina', birthDate: '1994-03-07' },
    { id: 'u14', name: 'Sandra Martins',     email: 'sandra@shalom.com',   role: UserRole.MEMBER, isMember: true,  ministries: ['café'],        phone: '(43) 99001-0014', address: 'Rua Amazonas, 130',      neighborhood: 'Centenário',       city: 'Londrina', birthDate: '1986-07-16' },
    { id: 'u15', name: 'Roberto Nunes',      email: 'roberto@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['café'],        phone: '(43) 99001-0015', address: 'Rua Pernambuco, 55',     neighborhood: 'Centro',           city: 'Londrina', birthDate: '1983-11-29' },
    { id: 'u16', name: 'Tatiane Borges',     email: 'tatiane@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['kids'],        phone: '(43) 99001-0016', address: 'Av. Rio de Janeiro, 400',neighborhood: 'Warta',            city: 'Londrina', birthDate: '1990-04-08' },
    { id: 'u17', name: 'Eduardo Campos',     email: 'eduardo@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['kids'],        phone: '(43) 99001-0017', address: 'Rua Roraima, 22',        neighborhood: 'Jardim Shangrilá', city: 'Londrina', birthDate: '1993-09-14' },
    { id: 'u18', name: 'Diego Pereira',      email: 'diego@shalom.com',    role: UserRole.MEMBER, isMember: true,  ministries: ['segurança'],   phone: '(43) 99001-0018', address: 'Rua Acre, 90',           neighborhood: 'Centenário',       city: 'Londrina', birthDate: '1987-01-20' },
    { id: 'u19', name: 'Marcos Rocha',       email: 'marcos@shalom.com',   role: UserRole.MEMBER, isMember: true,  ministries: ['segurança'],   phone: '(43) 99001-0019', address: 'Rua Tocantins, 180',     neighborhood: 'Gleba Palhano',    city: 'Londrina', birthDate: '1985-06-03' },
    { id: 'u20', name: 'Rodrigo Azevedo',    email: 'rodrigo@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['staff'],       phone: '(43) 99001-0020', address: 'Av. Café, 800',          neighborhood: 'Centro',           city: 'Londrina', birthDate: '1991-12-11' },
    { id: 'u21', name: 'Daniela Freitas',    email: 'daniela@shalom.com',  role: UserRole.MEMBER, isMember: true,  ministries: ['staff'],       phone: '(43) 99001-0021', address: 'Rua Bahia, 35',          neighborhood: 'Warta',            city: 'Londrina', birthDate: '1994-08-26' },
    { id: 'u22', name: 'Camila Ferreira',    email: 'camila@shalom.com',   role: UserRole.VISITOR,isMember: false, ministries: [] },
    { id: 'u23', name: 'Thiago Mendes',      email: 'thiago@shalom.com',   role: UserRole.VISITOR,isMember: false, ministries: [] },
    { id: 'u24', name: 'Letícia Freitas',    email: 'leticia@shalom.com',  role: UserRole.VISITOR,isMember: false, ministries: [] },
  ];

  private calendarEvents: CalendarEvent[] = [
    {
      id: 'ce1',
      title: 'Culto de Domingo',
      description: 'Culto dominical com louvor e pregação da Palavra.',
      date: new Date('2026-04-27'),
      time: '10:30',
      endTime: '12:00',
      type: CalendarEventType.CULT,
      location: 'Sede - Londrina',
      visibility: 'public'
    },
    {
      id: 'ce2',
      title: 'Culto de Domingo (Noite)',
      description: 'Culto noturno com louvor e pregação.',
      date: new Date('2026-04-27'),
      time: '19:00',
      endTime: '20:30',
      type: CalendarEventType.CULT,
      location: 'Sede - Londrina',
      visibility: 'public'
    },
    {
      id: 'ce3',
      title: 'Encontro de Jovens',
      description: 'Encontro especial para jovens com dinâmicas e palavra.',
      date: new Date('2026-05-02'),
      time: '20:00',
      endTime: '22:00',
      type: CalendarEventType.EVENT,
      location: 'Sede - Londrina',
      visibility: 'public'
    },
    {
      id: 'ce4',
      title: 'Culto de Domingo',
      description: 'Culto dominical com louvor e pregação da Palavra.',
      date: new Date('2026-05-04'),
      time: '10:30',
      endTime: '12:00',
      type: CalendarEventType.CULT,
      location: 'Sede - Londrina',
      visibility: 'public'
    },
    {
      id: 'ce5',
      title: 'Reunião de Líderes',
      description: 'Reunião mensal dos líderes de ministérios.',
      date: new Date('2026-05-07'),
      time: '19:30',
      endTime: '21:00',
      type: CalendarEventType.EVENT,
      location: 'Sede - Londrina',
      visibility: 'members_only'
    },
    {
      id: 'ce6',
      title: 'Culto de Domingo',
      description: 'Culto dominical com louvor e pregação da Palavra.',
      date: new Date('2026-05-11'),
      time: '10:30',
      endTime: '12:00',
      type: CalendarEventType.CULT,
      location: 'Sede - Londrina',
      visibility: 'public'
    },
    {
      id: 'ce7',
      title: 'Vigília de Oração',
      description: 'Uma noite dedicada à oração e intercessão.',
      date: new Date('2026-05-15'),
      time: '22:00',
      endTime: '00:00',
      type: CalendarEventType.EVENT,
      location: 'Sede - Londrina',
      visibility: 'public'
    }
  ];

  private ministries: Ministry[] = [
    {
      id: 'worship',
      name: 'Louvor',
      icon: '🎵',
      members: [
        { id: 'mm1', name: 'Carlos Henrique', phone: '(43) 99999-0001' },
        { id: 'mm2', name: 'Fernanda Lima', phone: '(43) 99999-0002' },
        { id: 'mm3', name: 'Rafael Souza', phone: '(43) 99999-0003' },
        { id: 'mm4', name: 'Juliana Santos', phone: '(43) 99999-0004' }
      ]
    },
    {
      id: 'reception',
      name: 'Recepção',
      icon: '🤝',
      members: [
        { id: 'mm5', name: 'Patricia Oliveira', phone: '(43) 99999-0005' },
        { id: 'mm6', name: 'Lucas Ferreira', phone: '(43) 99999-0006' },
        { id: 'mm7', name: 'Mariana Costa', phone: '(43) 99999-0007' }
      ]
    },
    {
      id: 'media',
      name: 'Mídia',
      icon: '🎬',
      members: [
        { id: 'mm8', name: 'Anderson Reis', phone: '(43) 99999-0008' },
        { id: 'mm9', name: 'Beatriz Alves', phone: '(43) 99999-0009' }
      ]
    },
    {
      id: 'coffee',
      name: 'Café',
      icon: '☕',
      members: [
        { id: 'mm10', name: 'Sandra Martins', phone: '(43) 99999-0010' },
        { id: 'mm11', name: 'Roberto Nunes', phone: '(43) 99999-0011' },
        { id: 'mm12', name: 'Cristina Vieira', phone: '(43) 99999-0012' }
      ]
    },
    {
      id: 'kids',
      name: 'Kids',
      icon: '🧒',
      members: [
        { id: 'mm13', name: 'Tatiane Borges', phone: '(43) 99999-0013' },
        { id: 'mm14', name: 'Eduardo Campos', phone: '(43) 99999-0014' }
      ]
    },
    {
      id: 'security',
      name: 'Segurança',
      icon: '🛡️',
      members: [
        { id: 'mm15', name: 'Diego Pereira', phone: '(43) 99999-0015' },
        { id: 'mm16', name: 'Marcos Rocha', phone: '(43) 99999-0016' }
      ]
    },
    {
      id: 'staff',
      name: 'Staff',
      icon: '⚙️',
      members: [
        { id: 'mm17', name: 'Rodrigo Azevedo', phone: '(43) 99999-0017' },
        { id: 'mm18', name: 'Daniela Freitas', phone: '(43) 99999-0018' },
        { id: 'mm19', name: 'Felipe Gomes', phone: '(43) 99999-0019' }
      ]
    },
    {
      id: 'prayer-team',
      name: 'Intercessão',
      icon: '🙏',
      members: [
        { id: 'mm20', name: 'Ana Paula Melo', phone: '(43) 99999-0020' },
        { id: 'mm21', name: 'Vanessa Cardoso', phone: '(43) 99999-0021' }
      ]
    }
  ];

  private schedules: MinistrySchedule[] = [];

  private smallGroups: SmallGroup[] = [
    {
      id: 'sg1',
      title: 'Grupo da Família Costa',
      description: 'Um grupo acolhedor focado em estudo bíblico e comunhão familiar. Nos reunimos toda terça-feira para adorar, estudar a Palavra e fortalecer laços de amizade.',
      leaders: ['Pedro Costa', 'Ana Costa'],
      address: 'Rua das Flores, 142 – Jardim Shangrilá',
      neighborhood: 'Jardim Shangrilá',
      dayOfWeek: 'Terça-feira',
      time: '19:30',
      members: [
        { id: 'sgm1', name: 'Pedro Costa', phone: '(43) 99101-0001' },
        { id: 'sgm2', name: 'Ana Costa', phone: '(43) 99101-0002' },
        { id: 'sgm3', name: 'Marcos Silva', phone: '(43) 99101-0003' },
        { id: 'sgm4', name: 'Juliana Rocha', phone: '(43) 99101-0004' },
        { id: 'sgm5', name: 'Thiago Mendes' },
        { id: 'sgm6', name: 'Letícia Freitas' }
      ]
    },
    {
      id: 'sg2',
      title: 'Grupo Zona Norte',
      description: 'Grupo voltado para jovens adultos da região norte da cidade. Combinamos estudo da Palavra com momentos de louvor e oração.',
      leaders: ['Rafael Almeida'],
      address: 'Av. Tiradentes, 980 – Gleba Palhano',
      neighborhood: 'Gleba Palhano',
      dayOfWeek: 'Quarta-feira',
      time: '20:00',
      members: [
        { id: 'sgm7', name: 'Rafael Almeida', phone: '(43) 99102-0001' },
        { id: 'sgm8', name: 'Camila Ferreira' },
        { id: 'sgm9', name: 'Diego Nunes', phone: '(43) 99102-0003' },
        { id: 'sgm10', name: 'Priscila Santos' },
        { id: 'sgm11', name: 'Bruno Carvalho' }
      ]
    },
    {
      id: 'sg3',
      title: 'Grupo Casais Abênçoados',
      description: 'Grupo exclusivo para casais que desejam crescer juntos na fé. Trabalhamos temas de relacionamento, família e propósito conjugal à luz da Bíblia.',
      leaders: ['Carlos Henrique', 'Fernanda Lima'],
      address: 'Rua Josefa Serafim Borges, 55 – Warta',
      neighborhood: 'Warta',
      dayOfWeek: 'Sexta-feira',
      time: '19:00',
      members: [
        { id: 'sgm12', name: 'Carlos Henrique', phone: '(43) 99103-0001' },
        { id: 'sgm13', name: 'Fernanda Lima', phone: '(43) 99103-0002' },
        { id: 'sgm14', name: 'Gabriel Souza' },
        { id: 'sgm15', name: 'Patrícia Souza' },
        { id: 'sgm16', name: 'Anderson Reis', phone: '(43) 99103-0005' },
        { id: 'sgm17', name: 'Beatriz Alves', phone: '(43) 99103-0006' },
        { id: 'sgm18', name: 'Luiz Teixeira' },
        { id: 'sgm19', name: 'Sandra Teixeira' }
      ]
    },
    {
      id: 'sg4',
      title: 'Grupo Centenário',
      description: 'Um grupo com muita história e fé! Atendemos principalmente famílias do bairro Centenário e região. Foco em comunhão, louvor e intercessão.',
      leaders: ['Vanessa Cardoso'],
      address: 'Rua Dom Pedro II, 310 – Centenário',
      neighborhood: 'Centenário',
      dayOfWeek: 'Quinta-feira',
      time: '19:30',
      members: [
        { id: 'sgm20', name: 'Vanessa Cardoso', phone: '(43) 99104-0001' },
        { id: 'sgm21', name: 'José Oliveira' },
        { id: 'sgm22', name: 'Maria Oliveira' },
        { id: 'sgm23', name: 'Rodrigo Azevedo', phone: '(43) 99104-0004' },
        { id: 'sgm24', name: 'Daniela Freitas' }
      ]
    }
  ];

  // Get all posts or filter by visibility
  getPosts(membersOnly: boolean = false): Post[] {
    if (membersOnly) {
      return this.posts.filter(post => post.visibility === Visibility.MEMBERS_ONLY);
    }
    // For public view, show only public posts
    if (!this.currentUser || !this.currentUser.isMember) {
      return this.posts.filter(post => post.visibility === Visibility.PUBLIC);
    }
    // For members, show all posts
    return this.posts;
  }

  // Get posts by type
  getPostsByType(type: PostType): Post[] {
    return this.posts.filter(post => post.type === type);
  }

  // Get single post
  getPost(id: string): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  // Set current user (for demo purposes)
  setCurrentUser(user: User | null): void {
    this.currentUser = user;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Mock user login
  login(email: string, password: string): User | null {
    // Mock authentication - in real app, this would call an API
    const mockUsers: User[] = [
      {
        id: 'u1',
        name: 'João Membro',
        email: 'member@shalom.com',
        role: UserRole.MEMBER,
        isMember: true
      },
      {
        id: 'u2',
        name: 'Administrador',
        email: 'admin@shalom.com',
        role: UserRole.ADMIN,
        isMember: true
      }
    ];

    const user = mockUsers.find(u => u.email === email);
    if (user) {
      this.currentUser = user;
      return user;
    }
    return null;
  }

  // Mock logout
  logout(): void {
    this.currentUser = null;
  }

  // Add new post (admin only)
  addPost(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      ...post,
      id: (this.posts.length + 1).toString(),
      createdAt: new Date()
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  // Toggle like on a post
  toggleLike(postId: string, userId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;
    const idx = post.likedByUsers.indexOf(userId);
    if (idx === -1) {
      post.likedByUsers.push(userId);
      post.likes = (post.likes || 0) + 1;
    } else {
      post.likedByUsers.splice(idx, 1);
      post.likes = (post.likes || 1) - 1;
    }
  }

  // Add a comment to a post
  addComment(postId: string, authorName: string, content: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;
    post.commentsList.push({
      id: `c${Date.now()}`,
      authorName,
      content,
      createdAt: new Date()
    });
  }

  // ── Calendar Events ──────────────────────────────────────────────────

  getCalendarEvents(): CalendarEvent[] {
    if (!this.currentUser) {
      return this.calendarEvents.filter(e => e.visibility === 'public');
    }
    return [...this.calendarEvents];
  }

  getCalendarEvent(id: string): CalendarEvent | undefined {
    return this.calendarEvents.find(e => e.id === id);
  }

  addCalendarEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const newEvent: CalendarEvent = {
      ...event,
      id: 'ce' + Date.now()
    };
    this.calendarEvents.push(newEvent);
    return newEvent;
  }

  updateCalendarEvent(id: string, changes: Partial<Omit<CalendarEvent, 'id'>>): CalendarEvent | null {
    const idx = this.calendarEvents.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.calendarEvents[idx] = { ...this.calendarEvents[idx], ...changes };
    return this.calendarEvents[idx];
  }

  deleteCalendarEvent(id: string): void {
    this.calendarEvents = this.calendarEvents.filter(e => e.id !== id);
    this.schedules = this.schedules.filter(s => s.eventId !== id);
  }

  // ── Ministries ───────────────────────────────────────────────────────

  getMinistries(): Ministry[] {
    return [...this.ministries];
  }

  // ── Ministry Schedules ───────────────────────────────────────────────

  getScheduleForEvent(eventId: string): MinistrySchedule | undefined {
    return this.schedules.find(s => s.eventId === eventId);
  }

  saveSchedule(eventId: string, assignments: { ministryId: string; memberIds: string[] }[]): MinistrySchedule {
    const existing = this.schedules.find(s => s.eventId === eventId);
    if (existing) {
      existing.assignments = assignments;
      return existing;
    }
    const newSchedule: MinistrySchedule = {
      id: 'ms' + Date.now(),
      eventId,
      assignments
    };
    this.schedules.push(newSchedule);
    return newSchedule;
  }

  // ── Members ──────────────────────────────────────────────────────────

  getMembers(): User[] {
    return [...this.members];
  }

  // ── Small Groups ─────────────────────────────────────────────────────

  getSmallGroups(): SmallGroup[] {
    return [...this.smallGroups];
  }

  addSmallGroup(group: Omit<SmallGroup, 'id'>): SmallGroup {
    const newGroup: SmallGroup = { ...group, id: 'sg' + Date.now() };
    this.smallGroups.push(newGroup);
    return newGroup;
  }

  updateSmallGroup(id: string, changes: Partial<Omit<SmallGroup, 'id'>>): SmallGroup | null {
    const idx = this.smallGroups.findIndex(g => g.id === id);
    if (idx === -1) return null;
    this.smallGroups[idx] = { ...this.smallGroups[idx], ...changes };
    return this.smallGroups[idx];
  }

  deleteSmallGroup(id: string): void {
    this.smallGroups = this.smallGroups.filter(g => g.id !== id);
  }

  addMemberToGroup(groupId: string, member: Omit<SmallGroupMember, 'id'>): void {
    const group = this.smallGroups.find(g => g.id === groupId);
    if (!group) return;
    group.members.push({ ...member, id: 'sgm' + Date.now() });
  }

  removeMemberFromGroup(groupId: string, memberId: string): void {
    const group = this.smallGroups.find(g => g.id === groupId);
    if (!group) return;
    group.members = group.members.filter(m => m.id !== memberId);
  }
}
