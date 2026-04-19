import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-churches',
  imports: [CommonModule],
  templateUrl: './churches.html',
  styleUrl: './churches.scss',
})
export class Churches {
  churches = [
    {
      name: 'Comunidade Shalom - Sede Central',
      address: 'Av. JK, 3130 - Centro',
      city: 'Londrina - PR',
      phone: 'Fone: 3323-6717/ WhatsApp: 98415-0196',
      schedule: 'Cultos aos domingos, às 10:30 e 19:00',
      isMain: true
    },
    {
      name: 'JARDIM VENEZA',
      address: 'Av. Robert Koch, 1872',
      city: 'Londrina - PR',
      phone: '(43) 3323-6717',
      schedule: 'Cultos aos domingos, às 19:00',
      isMain: false
    },
    {
      name: 'JARDIM BANDEIRANTES',
      address: 'Rua Serra Negra, 119',
      city: 'Londrina - PR',
      phone: '(43) 3323-6717',
      schedule: 'Cultos aos domingos, às 10:00',
      isMain: false
    },
    {
      name: 'PRADO FERREIRA',
      address: 'Rua Ulisses Guimarães, 207',
      city: 'Prado Ferreira - PR',
      phone: '(43) 3323-6717',
      schedule: 'Cultos aos domingos, às 19:30',
      isMain: false
    },
    {
      name: 'COMUNIDADE DO PARQUE',
      address: 'Rua Dançarino Rosado, 122',
      city: 'Arapongas - PR',
      phone: '(43) 3323-6717',
      schedule: 'Cultos às segundas, às 20:00',
      isMain: false
    }
  ];
}
