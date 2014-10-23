'use strict';


angular.module('waitingRoomApp')
    .factory('Dictionary', function ($window) {
        var dictionary = [
            {
                key: 'GENERAL_CompanyName',
                values: [
                    { value: 'Predok', language: 'da'},
                    { value: 'Predok', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Title',
                values: [
                    { value: 'Titel', language: 'da'},
                    { value: 'Title', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_EnterTitle',
                values: [
                    { value: 'Indtast en titel', language: 'da'},
                    { value: 'Please enter a title', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Doctor',
                values: [
                    { value: 'Læge', language: 'da'},
                    { value: 'Doctor', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Role',
                values: [
                    { value: 'Rolle', language: 'da'},
                    { value: 'Role', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Name',
                values: [
                    { value: 'Navn', language: 'da'},
                    { value: 'Name', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Cancel',
                values: [
                    { value: 'Annuller', language: 'da'},
                    { value: 'Cancel', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Username',
                values: [
                    { value: 'Brugernavn (email)', language: 'da'},
                    { value: 'Username (email)', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Password',
                values: [
                    { value: 'Kodeord', language: 'da'},
                    { value: 'Password', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Create',
                values: [
                    { value: 'Opret', language: 'da'},
                    { value: 'Create', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Step',
                values: [
                    { value: 'trin', language: 'da'},
                    { value: 'Step', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Question',
                values: [
                    { value: 'spørgsmål', language: 'da'},
                    { value: 'Question', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_SubQuestion',
                values: [
                    { value: 'underspørgsmål', language: 'da'},
                    { value: 'Subquestion', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Scheme',
                values: [
                    { value: 'spørgeskema', language: 'da'},
                    { value: 'Scheme', language: 'en'}
                ]
            },
            {
                key: 'GENERAL_Delete',
                values: [
                    { value: 'Slet', language: 'da'},
                    { value: 'Delete', language: 'en'}
                ]
            },
            {
                key: 'TABLET_PleaseChooseScheme',
                values: [
                    { value: 'Vælg et skema', language: 'da'},
                    { value: 'Please choose scheme', language: 'en'}
                ]
            },
            {
                key: 'TABLET_PleaseComplete',
                values: [
                    { value: 'Afslut skemaet', language: 'da'},
                    { value: 'Please complete the questionary.', language: 'en'}
                ]
            },
            {
                key: 'TABLET_Finish',
                values: [
                    { value: 'Afslut', language: 'da'},
                    { value: 'Finish.', language: 'en'}
                ]
            },
            {
                key: 'TABLET_AnswerHasBeenSend',
                values: [
                    { value: 'Dit svar er blevet sendt', language: 'da'},
                    { value: 'Your answers have been send', language: 'en'}
                ]
            },
            {
                key: 'TABLET_ThankYou',
                values: [
                    { value: 'Tak for dine svar!', language: 'da'},
                    { value: 'Thank you!', language: 'en'}
                ]
            },
            {
                key: 'TABLET_SendYouAnswerTo',
                values: [
                    { value: 'Send svar til læge', language: 'da'},
                    { value: 'Send your answer to', language: 'en'}
                ]
            },
            {
                key: 'TABLET_TabletReset',
                values: [
                    { value: 'Dine data slettes fra denne enhed om:', language: 'da'},
                    { value: 'This tablet will be reset in:', language: 'en'}
                ]
            },
            {
                key: 'TABLET_Sec',
                values: [
                    { value: 'sek', language: 'da'},
                    { value: 'sec', language: 'en'}
                ]
            },
            {
                key: 'TABLET_EnterText',
                values: [
                    { value: 'Indtast svar', language: 'da'},
                    { value: 'Enter text', language: 'en'}
                ]
            },
            {
                key: 'TABLET_EnterNumber',
                values: [
                    { value: 'Indtast svar i tal', language: 'da'},
                    { value: 'Enter number', language: 'en'}
                ]
            },
            {
                key: 'TABLET_ChooseSchemet',
                values: [
                    { value: 'Hvad vil du tale med din læge om?', language: 'da'},
                    { value: 'What would you like to talk with your doctor about?', language: 'en'}
                ]
            },
            {
                key: 'TABLET_Home',
                values: [
                    { value: 'Forside', language: 'da'},
                    { value: 'Home', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Question',
                values: [
                    { value: 'Spørgsmål', language: 'da'},
                    { value: 'Question', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Answer',
                values: [
                    { value: 'Svar', language: 'da'},
                    { value: 'Answer', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Empty',
                values: [
                    { value: 'Intet svar', language: 'da'},
                    { value: 'Empty', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Back',
                values: [
                    { value: 'Forrige', language: 'da'},
                    { value: 'Back', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Next',
                values: [
                    { value: 'Næste', language: 'da'},
                    { value: 'Next', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_Copying',
                values: [
                    { value: 'Kopierer...', language: 'da'},
                    { value: 'Copying...', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_ChartText',
                values: [
                    { value: 'Journaltekst', language: 'da'},
                    { value: 'Charttext', language: 'en'}
                ]
            },
            {
                key: 'PATIENT_CopyPast',
                values: [
                    { value: 'Kopier', language: 'da'},
                    { value: 'Copy / Past', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_CreateScheme',
                values: [
                    { value: 'Opret spørgeskema', language: 'da'},
                    { value: 'Create Scheme', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_Home',
                values: [
                    { value: 'Hjem', language: 'da'},
                    { value: 'Home', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_Members',
                values: [
                    { value: 'Klinikadministration', language: 'da'},
                    { value: 'Members', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_Settings',
                values: [
                    { value: 'Indstillinger', language: 'da'},
                    { value: 'Settings', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_Logout',
                values: [
                    { value: 'Log ud', language: 'da'},
                    { value: 'Logout', language: 'en'}
                ]
            },
            {
                key: 'NAVIGATION_SchemeaBuilder',
                values: [
                    { value: 'Skemaopbygning', language: 'da'},
                    { value: 'Scheme Builder', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_Email',
                values: [
                    { value: 'Email', language: 'da'},
                    { value: 'Email', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_Password',
                values: [
                    { value: 'Kodeord', language: 'da'},
                    { value: 'Password', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_PleaseEnter',
                values: [
                    { value: 'Indstast din emailadresse og dit kodeord', language: 'da'},
                    { value: 'Please enter your email and password.', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_SignIn',
                values: [
                    { value: 'Log in', language: 'da'},
                    { value: 'Sign In', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_PasswordIncorrect',
                values: [
                    { value: 'Kodeordet er ikke korrekt.', language: 'da'},
                    { value: 'This password is not correct.', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_EmailNotRegistered',
                values: [
                    { value: 'Emailen kan ikke genkendes.', language: 'da'},
                    { value: 'This email is not registered.', language: 'en'}
                ]
            },
            {
                key: 'LOGIN_MissingCredentials',
                values: [
                    { value: 'Brugernavn og kodeord mangler.', language: 'da'},
                    { value: 'Credentials is missing.', language: 'en'}
                ]
            },
            {
                key: 'FRONTPAGE_Scheme',
                values: [
                    { value: 'Spørgeskema', language: 'da'},
                    { value: 'Scheme', language: 'en'}
                ]
            },
            {
                key: 'FRONTPAGE_TimeForAppointment',
                values: [
                    { value: 'Tid for konsultation', language: 'da'},
                    { value: 'Time for appointment', language: 'en'}
                ]
            },
            {
                key: 'FRONTPAGE_Submitted',
                values: [
                    { value: 'Tid for indsendelse', language: 'da'},
                    { value: 'Submitted', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_AddSubQuestion',
                values: [
                    { value: 'Opret underspørgsmål', language: 'da'},
                    { value: 'Add Subquestion', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_EnterQuestion',
                values: [
                    { value: 'Indtast et spørgsmål.', language: 'da'},
                    { value: 'Please enter a question.', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_EnterQuestionType',
                values: [
                    { value: 'Indtast et spørgsmåltype.', language: 'da'},
                    { value: 'Please enter a question type.', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_JournalText',
                values: [
                    { value: 'Journal tekst', language: 'da'},
                    { value: 'JounalText', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_Answer',
                values: [
                    { value: 'Svar', language: 'da'},
                    { value: 'Answer', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_Option',
                values: [
                    { value: 'Svarmuligheder', language: 'da'},
                    { value: 'Option', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_AddOption',
                values: [
                    { value: 'Tilføj svarmulighed', language: 'da'},
                    { value: 'Add Option', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_Type',
                values: [
                    { value: 'Spørgsmålstype', language: 'da'},
                    { value: 'Type', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_Question',
                values: [
                    { value: 'Spørgsmål', language: 'da'},
                    { value: 'Question', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_CorrectParentAnswer',
                values: [
                    { value: 'Svar på hovedspørgsmål', language: 'da'},
                    { value: 'Answer to parent question', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_CorrectParentAnswerValidationText',
                values: [
                    { value: 'Vælg det svar hvad der skal være det korrekte svar tilhovedspørgsmålet for at dette spørgsmål vises', language: 'da'},
                    { value: 'Please select an answer that should be resolved for this question to be shown.', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_SaveQuestion',
                values: [
                    { value: 'Gem Spørgsmål', language: 'da'},
                    { value: 'Save Question', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_GeneratedJournalText',
                values: [
                    { value: 'Til journal', language: 'da'},
                    { value: 'For journal', language: 'en'}
                ]
            },
            {
                key: 'QuestionBuilder_PatientAnswer',
                values: [
                    { value: 'Patientsvar', language: 'da'},
                    { value: 'Patient input', language: 'en'}
                ]
            },
            {
                key: 'SchemeBuilder_AddStep',
                values: [
                    { value: 'Tilføj trin', language: 'da'},
                    { value: 'Add Step', language: 'en'}
                ]
            },
            {
                key: 'SchemeBuilder_SaveScheme',
                values: [
                    { value: 'Gem Spørgeskema', language: 'da'},
                    { value: 'Save scheme', language: 'en'}
                ]
            },
            {
                key: 'StepBuilder_SaveStep',
                values: [
                    { value: 'Gem trin', language: 'da'},
                    { value: 'Save Step', language: 'en'}
                ]
            },
            {
                key: 'StepBuilder_AddQuestion',
                values: [
                    { value: 'Tilføj spørgsmål', language: 'da'},
                    { value: 'Add question', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_AddClinic',
                values: [
                    { value: 'Tilføj klinik', language: 'da'},
                    { value: 'Add Clinic', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_AddAdmin',
                values: [
                    { value: 'Tilføj administrator', language: 'da'},
                    { value: 'Add administrator', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_CustomerOverview',
                values: [
                    { value: 'Kunde oversigt', language: 'da'},
                    { value: 'Customer Overview', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_Clinic',
                values: [
                    { value: 'Klinik', language: 'da'},
                    { value: 'Clinic', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_Doctor',
                values: [
                    { value: 'Læge', language: 'da'},
                    { value: 'Doctor', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_BackToOverview',
                values: [
                    { value: 'Tilbage til oversigt', language: 'da'},
                    { value: 'Back to the overview', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_Admin',
                values: [
                    { value: 'Administrator', language: 'da'},
                    { value: 'Administrator', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_SaveAdmin',
                values: [
                    { value: 'Gem Administrator', language: 'da'},
                    { value: 'Save Administrator', language: 'en'}
                ]
            },
            {
                key: 'CLINIC_DeleteAdmin',
                values: [
                    { value: 'Slet Administrator', language: 'da'},
                    { value: 'Delete Administrator', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_AddDoctor',
                values: [
                    { value: 'Tilføj Læge', language: 'da'},
                    { value: 'Add Doctor', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_DeleteClinic',
                values: [
                    { value: 'Slet Klinik', language: 'da'},
                    { value: 'Delete Clinic', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_DoctorsOverview',
                values: [
                    { value: 'Læge oversigt', language: 'da'},
                    { value: 'Doctors Overview', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_EnterName',
                values: [
                    { value: 'Indtast et navn', language: 'da'},
                    { value: 'Please enter a name', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_EnterRole',
                values: [
                    { value: 'Vælg en rolle', language: 'da'},
                    { value: 'Please choose a role', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_SaveDoctor',
                values: [
                    { value: 'Gem læge', language: 'da'},
                    { value: 'Save Doctor', language: 'en'}
                ]
            },
            {
                key: 'DOCTOR_DeleteDoctor',
                values: [
                    { value: 'Slet læge', language: 'da'},
                    { value: 'Delete Doctor', language: 'en'}
                ]
            },
            {
                key: 'MODAL_CreateClinic',
                values: [
                    { value: 'Opret klinik', language: 'da'},
                    { value: 'Create Clinic', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterClinicName',
                values: [
                    { value: 'Indtast navnet på kliniken', language: 'da'},
                    { value: 'Please enter a clinic name', language: 'en'}
                ]
            },
            {
                key: 'MODAL_CreateDoctor',
                values: [
                    { value: 'Opret læge', language: 'da'},
                    { value: 'Create Doctor', language: 'en'}
                ]
            },
            {
                key: 'MODAL_CreateAdmin',
                values: [
                    { value: 'Opret administrator', language: 'da'},
                    { value: 'Create Administrator', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterName',
                values: [
                    { value: 'Indtast et navn', language: 'da'},
                    { value: 'Please enter a name', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterRole',
                values: [
                    { value: 'Vælg en rolle', language: 'da'},
                    { value: 'Please choose a role', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterEmail',
                values: [
                    { value: 'Indtast en valid email adresse', language: 'da'},
                    { value: 'Please enter a valid email', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterPassword',
                values: [
                    { value: 'Indtast et kodeord', language: 'da'},
                    { value: 'Please enter a password', language: 'en'}
                ]
            },
            {
                key: 'MODAL_EnterTitleFor',
                values: [
                    { value: 'Indtast titel for', language: 'da'},
                    { value: 'Please enter a title for', language: 'en'}
                ]
            },
            {
                key: 'MODAL_AreYouSure',
                values: [
                    { value: 'Er du sikker på du ønsker at slette: ', language: 'da'},
                    { value: 'Are you sure you want to delete: ', language: 'en'}
                ]
            },
            {
                key: 'MODAL_AndAllSubitems',
                values: [
                    { value: '- Og alle underelementer?', language: 'da'},
                    { value: '- And all subitems?: ', language: 'en'}
                ]
            },
            {
                key: 'MODAL_AndAllDoctors',
                values: [
                    { value: '- Og alle de tilhørende læger?', language: 'da'},
                    { value: '- And all its doctors?: ', language: 'en'}
                ]
            }
        ];

        return {
            init: function (lang) {
                $window.moment().lang(lang)

                var d = {};
                _.forEach(dictionary, function (k) {
                    d[k.key] = _.find(k.values, function (v) {
                        if (v.language === lang) {
                            return v;
                        }
                    }).value;
                });

                return d;
            }
        }
    } );