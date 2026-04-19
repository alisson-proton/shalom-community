import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';

interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
  longDescription: string;
  image: string;
  requested: boolean;
}

interface ServeForm {
  fullName: string;
  birthDate: string;
  whatsapp: string;
  email: string;
  availability: string;
  weekendsPerMonth: string;
  aboutYou: string;
  commitment: boolean;
}

@Component({
  selector: 'app-serve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './serve.html',
  styleUrls: ['./serve.scss']
})
export class Serve {
  selectedDept: Department | null = null;
  formSubmitted = false;

  form: ServeForm = this.emptyForm();

  departments: Department[] = [
    {
      id: 'reception', name: 'Recepção', icon: '🤝',
      description: 'Acolha e recepcione as pessoas que chegam à igreja.',
      longDescription: 'O ministério de Recepção é a primeira impressão que as pessoas têm da nossa igreja. Você será responsável por acolher, orientar e fazer com que cada pessoa se sinta em casa desde o momento em que chega.',
      image: '/reception.jpg',
      requested: false
    },
    {
      id: 'teaching', name: 'Ensino', icon: '📖',
      description: 'Ensine e discipule pessoas através da Palavra de Deus.',
      longDescription: 'No ministério de Ensino, você terá a oportunidade de compartilhar a Palavra de Deus, discipular vidas e ajudar pessoas a crescerem em seu relacionamento com Cristo através de estudos bíblicos e acompanhamento.',
      image: '/teaching.jpg',
      requested: false
    },
    {
      id: 'security', name: 'Segurança', icon: '🛡️',
      description: 'Garanta a segurança e o bem-estar de todos nos cultos e eventos.',
      longDescription: 'A equipe de Segurança cuida do bem-estar de todos nos cultos e eventos. Você atuará garantindo que o ambiente seja seguro, organizado e acolhedor para todas as famílias.',
      image: '/serving.jpg',
      requested: false
    },
    {
      id: 'teens', name: 'Adolescentes', icon: '🧑‍🤝‍🧑',
      description: 'Ministre e acompanhe a juventude da nossa comunidade.',
      longDescription: 'O ministério de Adolescentes é voltado para impactar a próxima geração. Você vai liderar, mentorear e caminhar junto com os jovens, criando um ambiente seguro onde eles possam conhecer Jesus.',
      image: '/teens.jpg',
      requested: false
    },
    {
      id: 'youth', name: 'Jovens', icon: '🧑‍🤝‍🧑',
      description: 'Ministre e acompanhe a juventude da nossa comunidade.',
      longDescription: 'O ministério de Jovens é voltado para impactar a próxima geração. Você vai liderar, mentorear e caminhar junto com os jovens, criando um ambiente seguro onde eles possam conhecer Jesus.',
      image: '/youth.jpg',
      requested: false
    },
    {
      id: 'worship', name: 'Louvor', icon: '🎵',
      description: 'Use seus talentos musicais para adorar e conduzir a igreja em louvor.',
      longDescription: 'O ministério de Louvor conduz a igreja em adoração a Deus. Se você tem talentos musicais — canto, instrumentos ou produção sonora — venha usar seus dons para criar uma atmosfera de adoração e encontro com Deus.',
      image: '/worship.jpg',
      requested: false
    },
    {
      id: 'media', name: 'Mídia', icon: '🎬',
      description: 'Produza conteúdo, transmissões ao vivo e comunicação visual.',
      longDescription: 'A equipe de Mídia é responsável por capturar e compartilhar a mensagem da igreja com o mundo. Fotografia, vídeo, transmissões ao vivo, design gráfico e redes sociais — tudo para amplificar o evangelho.',
      image: '/media.jpg',
      requested: false
    },
    {
      id: 'staff', name: 'Staff', icon: '⚙️',
      description: 'Apoie a logística e organização dos cultos e eventos.',
      longDescription: 'O Staff é o coração operacional da igreja. Você ajudará na organização, montagem, limpeza e logística dos cultos e eventos, garantindo que tudo funcione com excelência para a glória de Deus.',
      image: '/staff.jpg',
      requested: false
    },
    {
      id: 'kids', name: 'Kids', icon: '🧒',
      description: 'Cuide e ensine as crianças com amor e criatividade.',
      longDescription: 'O ministério Kids cuida das crianças enquanto os pais participam do culto. Com criatividade e amor, você ensinará as crianças sobre Jesus através de atividades lúdicas, histórias bíblicas e muita diversão.',
      image: '/kids.jpg',
      requested: false
    },
    {
      id: 'prayer-team', name: 'Intercessão', icon: '🙏',
      description: 'Ore pela igreja, pelos líderes e pela cidade.',
      longDescription: 'O ministério de Intercessão sustenta a igreja em oração. Você fará parte de uma equipe dedicada a orar pela liderança, pelos membros, pela cidade e pelas nações, buscando a direção de Deus.',
      image: '/prayer-team.jpg',
      requested: false
    },
    {
      id: 'coffee', name: 'Café', icon: '☕',
      description: 'Prepare e sirva o café que acolhe e conecta as pessoas.',
      longDescription: 'O ministério do Café é responsável por preparar e servir com carinho o café e os lanches nos cultos e eventos. É um momento de acolhimento onde as pessoas se conectam e se sentem em casa.',
      image: '/coffee.jpg',
      requested: false
    }
  ];

  constructor(private mockDataService: MockDataService) {}

  get user() {
    return this.mockDataService.getCurrentUser();
  }

  openModal(dept: Department): void {
    this.selectedDept = dept;
    this.form = this.emptyForm();
    this.formSubmitted = false;
  }

  closeModal(): void {
    this.selectedDept = null;
  }

  submitForm(): void {
    if (!this.form.commitment) return;
    if (this.selectedDept) {
      this.selectedDept.requested = true;
    }
    this.formSubmitted = true;
  }

  private emptyForm(): ServeForm {
    return {
      fullName: '',
      birthDate: '',
      whatsapp: '',
      email: '',
      availability: '',
      weekendsPerMonth: '',
      aboutYou: '',
      commitment: false
    };
  }
}
