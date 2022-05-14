
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DeviceMotion , DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@awesome-cordova-plugins/device-motion/ngx';
// DeviceOrientationCompassHeading is an interface for compass
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation/ngx';
import { timer } from 'rxjs';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-alarma',
  templateUrl: './alarma.component.html',
  styleUrls: ['./alarma.component.scss'],
})
export class AlarmaComponent implements OnInit {
  activa:boolean=false;
  subscription:any;
  x:any;
  y:any;
  z:any;

  constructor(private deviceMotion: DeviceMotion, private deviceOrientation: DeviceOrientation,private nativeAudio: NativeAudio, 
    private flashlight: Flashlight, private vibration: Vibration, private media: Media, public authService: AuthService) { }

  ngOnInit() {
   var options : DeviceMotionAccelerometerOptions = {
    frequency: 500
  }
  this.nativeAudio.preloadComplex('uniqueKey2', 'assets/media/bell.mp3', 1, 1, 0).then(() => {     
               
  });
  this.nativeAudio.preloadComplex('uniqueKey1', 'assets/media/phone.mp3', 1, 1, 0).then(() => {     
               
  });
  }

 

  changeBloqueado()
  {
    if (this.activa)
    {
     
     // Stop watch
    this.subscription.unsubscribe();
      this.activa=false;
     
    }else{

      let flag = true;
    let flagAcostado = false;
    let flagIzq = true;
    let flagDer = true;

    let cont = 0;

      var options : DeviceMotionAccelerometerOptions = {
        frequency: 200
      }


  


    // Watch device acceleration
      this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;


        if (this.y < 1 && this.x < 1 && this.x > -1 && flagAcostado === true) {
          flagAcostado = false;
          timer(500).subscribe(() => {
            if (this.x < 3) {
              // this.audioHor.load();
              // this.audioHor.play();
    
              flagAcostado = false;
              this.vibration.vibrate(5000);
            }
          });
        } else if (this.y > 5 || this.x > 5 || this.x < -5 && flagAcostado === false) {
          flagAcostado = true;
        }
        // vertical y linterna
        if (this.y > 3 && flag == true) {
          flag = false;
          this.flashlight.switchOn();
          // this.audioVer.load();
          // this.audioVer.play();

          timer(5000).subscribe(() => {
            if (this.y > 3) {
              flag = false;
              this.flashlight.switchOff();
            }
          });
        } else if (this.y < 3 && flag === false) {
          this.flashlight.switchOff();
          flag = true;
        }

        // izquierda TELEFONO
        if (this.x > 3 && flagIzq === true) {
          flagIzq = false;
          timer(500).subscribe(() => {
            if (this.x > 3) {
              flagIzq = false;
              // this.audioIzq.load();ioni
              // this.audioIzq.play();
              
              this.nativeAudio.play('uniqueKey1', function (){
                this.nativeAudio.stop();
              })
            }
          });
        } else if (this.x < 3 && flagIzq === false) {
          flagIzq = true;
        }

        // derecha CAMPANA
        if (this.x < -3 && flagDer === true) {
          flagDer = false;
          timer(500).subscribe(() => {
            if (this.x < -3) {
              flagDer = false;
              
              this.nativeAudio.play('uniqueKey2', function (){
                this.nativeAudio.stop();
              })
            }

          });
        } else if (this.x > -3 && flagDer === false) {
          flagDer = true;
        }
       
      });
    
      this.activa=true;

    }
  }
}
