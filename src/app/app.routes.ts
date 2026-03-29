import { Routes } from '@angular/router';
import { Bdcus2Component } from './bdcus-2/bdcus-2.component';

export const routes: Routes = [
  // Customer တစ်ယောက်ချင်းစီအတွက် လမ်းကြောင်း
  // :id နေရာမှာ random ဖြစ်တဲ့ secret key တွေ ဝင်လာပါလိမ့်မယ်
  { 
    path: ':id', 
    component: Bdcus2Component 
  },

  // Privacy အတွက် အရေးကြီးချက် -
  // id မပါဘဲ ဒီအတိုင်း mysite.vercel.app/ ကိုဝင်လာရင် ဒါမှမဟုတ်
  // မှားယွင်းတဲ့ id ရိုက်ထည့်လိုက်ရင် ဒီလမ်းကြောင်းကို ရောက်သွားပါမယ်။
  { 
    path: '**', 
    redirectTo: '/not-found', 
    pathMatch: 'full' 
  },
  
  // လိုအပ်ရင် 404 စာမျက်နှာသီးသန့်ဆောက်ပြီး ဒီမှာ route ချိတ်နိုင်ပါတယ်
  // { path: 'not-found', component: NotFoundComponent }
];