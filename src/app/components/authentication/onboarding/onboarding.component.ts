import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile.model';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UtilsService } from 'src/app/service/utils.service';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent implements OnInit {
  user: UserProfile | null;
  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    "Côte d'Ivoire",
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czechia (Czech Republic)',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Holy See',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar (formerly Burma)',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];
  url_regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
  constructor(public auth: AuthenticationService, public util:UtilsService) {
    this.user = null;
    this.auth.get_current_user().subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit(): void {}

  save_data() {
    if (this.user != null && this.validate_user()) {
      this.auth.onboard_user(this.user);
    }
  }

  validate_user(): boolean {
    if (this.user == null) return false;

    if (
      this.is_empty_string(this.user.bio, 'Bio') ||
      this.is_empty_string(this.user.cover_picture, 'Cover Picture') ||
      this.is_empty_string(this.user.location, 'Location') ||
      this.is_empty_string(this.user.name, 'Name') ||
      this.is_empty_string(this.user.occupation, 'Occupation') ||
      this.is_empty_string(this.user.username, 'Username') ||
      this.is_empty_string(this.user.gender, 'Gender') ||
      this.is_empty_string(this.user.relationship, 'Relationship')
    ) {
      return false;
    }

    if (
      !this.is_valid_length(this.user.bio, 'Bio', 5, 40) ||
      !this.is_valid_length(this.user.location, 'Location', 3, 20) ||
      !this.is_valid_length(this.user.name, 'Name', 3, 20) ||
      !this.is_valid_length(this.user.occupation, 'Occupation', 3, 20) ||
      !this.is_valid_length(this.user.username, 'Username', 3, 15)
    ) {
      return false;
    }

    return true;
  }
  is_empty_string(data: string, name: string): boolean {
    if (data.length == 0) {
      alert("You can't have empty " + name);
      return true;
    }
    return false;
  }
  is_valid_length(
    data: string,
    name: string,
    minimum: number,
    maximum: number
  ): boolean {
    if (data.length > maximum) {
      alert(name + ' is very long.');
      return false;
    }
    if (data.length < minimum) {
      alert(name + ' is very short.');
      return false;
    }
    return true;
  }

  is_valid_url(url: string) {
    return this.url_regex.test(url);
  }

  upload_profile_picture(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.util.downscaleImage(reader.result!.toString(), 500, 500)
        .then((downscaledImage) => {
          // Use the downscaled image
          this.user!['profile_picture'] = downscaledImage;
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
  upload_cover_picture(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.util.downscaleImage(reader.result!.toString(), 700, 700)
        .then((downscaledImage) => {
          // Use the downscaled image
          this.user!['cover_picture'] = downscaledImage;
        })
        .catch((error) => {
          console.error(error);
        });
    };
  }
}
