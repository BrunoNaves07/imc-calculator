import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    if(imc < 18.5) {
      this.showMessage(`IMC = ${imc.toFixed(2)} - Magreza`);
    } else if(imc >= 18.5 && imc <= 24.9) {
      this.showMessage(`IMC = ${imc.toFixed(2)} - Normal`);
    } else if(imc > 24.9 && imc <= 30) {
      this.showMessage(`IMC = ${imc.toFixed(2)} - Sobrepeso`);
    } else if(imc > 30) {
      this.showMessage(`IMC = ${imc.toFixed(2)} - Obesidade`);
    }

  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
