import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../components/navbar.ts';
import '../components/footer.ts';
import '../components/modal-dialog.ts';
import '../components/card-component.ts'; // ✅ Import komponen card

@customElement('page-help')
export class HelpPage extends LitElement {
  createRenderRoot() {
    return this; // ✅ Gunakan Light DOM agar Tailwind bekerja
  }

  private _showModalDialog() {
    console.log('🟢 Membuka modal');

    const modalDialog = this.renderRoot?.querySelector(
      'modal-dialog'
    ) as HTMLElement & {
      isOpen: boolean;
      setContent: (content: HTMLElement) => void;
    };

    if (modalDialog) {
      modalDialog.isOpen = true;

      // Data JSON yang akan dikirim ke card
      const ConfigDevicesLocal = {
        tagname: 'Pompa-1',
        type: 'Pompa',
        description: 'Pompa sirkulasi hidroponik',
        unit: 'Detik',
        highRange: 100,
        lowRange: 0,
        highAlarm: 80,
        lowAlarm: 30,
      };

      // Buat elemen custom <card-component>
      const card = document.createElement('card-component') as HTMLElement & {
        data: any;
      };

      // Set data JSON ke dalam card-component
      card.data = ConfigDevicesLocal;

      // Tambahkan ke dalam modal
      modalDialog.setContent(card);
    }
  }

  render() {
    return html`
      <app-navbar></app-navbar>
      <main
        class="p-8 my-14 bg-gradient-to-tr from-blue-50 to-green-300 min-h-full relative"
      >
        <h1 class="text-3xl font-extrabold text-blue-700">Help & Support</h1>
        <p class="text-gray-700 text-lg">
          Butuh bantuan? Berikut adalah sumber daya yang dapat membantu Anda:
        </p>

        <button
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition"
          @click=${this._showModalDialog}
        >
          Hubungi Kami
        </button>

        <!-- Komponen modal -->
        <modal-dialog></modal-dialog>
      </main>
      <app-footer></app-footer>
    `;
  }
}
