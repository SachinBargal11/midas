﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MIDAS.GBX.DataRepository.Model
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MIDASGBXEntities : DbContext
    {
        public MIDASGBXEntities()
            : base("name=MIDASGBXEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AccidentTreatment> AccidentTreatments { get; set; }
        public virtual DbSet<AccidentWitness> AccidentWitnesses { get; set; }
        public virtual DbSet<AddressInfo> AddressInfoes { get; set; }
        public virtual DbSet<AdjusterMaster> AdjusterMasters { get; set; }
        public virtual DbSet<Attorney> Attorneys { get; set; }
        public virtual DbSet<AttorneyVisit> AttorneyVisits { get; set; }
        public virtual DbSet<BlobStorage> BlobStorages { get; set; }
        public virtual DbSet<BlobStorageType> BlobStorageTypes { get; set; }
        public virtual DbSet<CalendarEvent> CalendarEvents { get; set; }
        public virtual DbSet<CalendarView> CalendarViews { get; set; }
        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<CaseCompanyConsentDocument> CaseCompanyConsentDocuments { get; set; }
        public virtual DbSet<CaseCompanyMapping> CaseCompanyMappings { get; set; }
        public virtual DbSet<CaseDocument> CaseDocuments { get; set; }
        public virtual DbSet<CaseInsuranceMapping> CaseInsuranceMappings { get; set; }
        public virtual DbSet<CaseStatu> CaseStatus { get; set; }
        public virtual DbSet<CaseType> CaseTypes { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<CompanyCaseConsentApproval> CompanyCaseConsentApprovals { get; set; }
        public virtual DbSet<CompanyICDTypeCode> CompanyICDTypeCodes { get; set; }
        public virtual DbSet<CompanyRoomTestDetail> CompanyRoomTestDetails { get; set; }
        public virtual DbSet<CompanySpecialtyDetail> CompanySpecialtyDetails { get; set; }
        public virtual DbSet<CompanyStatusType> CompanyStatusTypes { get; set; }
        public virtual DbSet<CompanyType> CompanyTypes { get; set; }
        public virtual DbSet<ConsentGivenType> ConsentGivenTypes { get; set; }
        public virtual DbSet<ContactInfo> ContactInfoes { get; set; }
        public virtual DbSet<DefendantVehicle> DefendantVehicles { get; set; }
        public virtual DbSet<DiagnosisCode> DiagnosisCodes { get; set; }
        public virtual DbSet<DiagnosisCodeCompany> DiagnosisCodeCompanies { get; set; }
        public virtual DbSet<DiagnosisType> DiagnosisTypes { get; set; }
        public virtual DbSet<DiagnosisTypeCompany> DiagnosisTypeCompanies { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<DoctorCaseConsentApproval> DoctorCaseConsentApprovals { get; set; }
        public virtual DbSet<DoctorLocationSchedule> DoctorLocationSchedules { get; set; }
        public virtual DbSet<DoctorRoomTestMapping> DoctorRoomTestMappings { get; set; }
        public virtual DbSet<DoctorSpeciality> DoctorSpecialities { get; set; }
        public virtual DbSet<DoctorTaxType> DoctorTaxTypes { get; set; }
        public virtual DbSet<DocumentNodeObjectMapping> DocumentNodeObjectMappings { get; set; }
        public virtual DbSet<EOVisit> EOVisits { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<GeneralSetting> GeneralSettings { get; set; }
        public virtual DbSet<ICDTypeCode> ICDTypeCodes { get; set; }
        public virtual DbSet<IMEVisit> IMEVisits { get; set; }
        public virtual DbSet<InsuranceMaster> InsuranceMasters { get; set; }
        public virtual DbSet<InsuranceMasterType> InsuranceMasterTypes { get; set; }
        public virtual DbSet<InsuranceType> InsuranceTypes { get; set; }
        public virtual DbSet<Invitation> Invitations { get; set; }
        public virtual DbSet<InvitationType> InvitationTypes { get; set; }
        public virtual DbSet<LanguagePreference> LanguagePreferences { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<MailTemplate> MailTemplates { get; set; }
        public virtual DbSet<MaritalStatu> MaritalStatus { get; set; }
        public virtual DbSet<MidasDocument> MidasDocuments { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<OTP> OTPs { get; set; }
        public virtual DbSet<OTPCompanyMapping> OTPCompanyMappings { get; set; }
        public virtual DbSet<PasswordToken> PasswordTokens { get; set; }
        public virtual DbSet<Patient> Patients { get; set; }
        public virtual DbSet<PatientAccidentInfo> PatientAccidentInfoes { get; set; }
        public virtual DbSet<PatientDocument> PatientDocuments { get; set; }
        public virtual DbSet<PatientEmpInfo> PatientEmpInfoes { get; set; }
        public virtual DbSet<PatientFamilyMember> PatientFamilyMembers { get; set; }
        public virtual DbSet<PatientInsuranceInfo> PatientInsuranceInfoes { get; set; }
        public virtual DbSet<PatientLanguagePreferenceMapping> PatientLanguagePreferenceMappings { get; set; }
        public virtual DbSet<PatientPersonalSetting> PatientPersonalSettings { get; set; }
        public virtual DbSet<PatientPriorAccidentInjury> PatientPriorAccidentInjuries { get; set; }
        public virtual DbSet<PatientSocialMediaMapping> PatientSocialMediaMappings { get; set; }
        public virtual DbSet<PatientType> PatientTypes { get; set; }
        public virtual DbSet<PatientVisit> PatientVisits { get; set; }
        public virtual DbSet<PatientVisitDiagnosisCode> PatientVisitDiagnosisCodes { get; set; }
        public virtual DbSet<PatientVisitProcedureCode> PatientVisitProcedureCodes { get; set; }
        public virtual DbSet<PatientVisitUnscheduled> PatientVisitUnscheduleds { get; set; }
        public virtual DbSet<PendingReferral> PendingReferrals { get; set; }
        public virtual DbSet<PendingReferralProcedureCode> PendingReferralProcedureCodes { get; set; }
        public virtual DbSet<PlaintiffVehicle> PlaintiffVehicles { get; set; }
        public virtual DbSet<PolicyOwner> PolicyOwners { get; set; }
        public virtual DbSet<PreferredAncillaryProvider> PreferredAncillaryProviders { get; set; }
        public virtual DbSet<PreferredAttorneyProvider> PreferredAttorneyProviders { get; set; }
        public virtual DbSet<PreferredMedicalProvider> PreferredMedicalProviders { get; set; }
        public virtual DbSet<PreferredUIView> PreferredUIViews { get; set; }
        public virtual DbSet<ProcedureCode> ProcedureCodes { get; set; }
        public virtual DbSet<ProcedureCodeCompanyMapping> ProcedureCodeCompanyMappings { get; set; }
        public virtual DbSet<Referral> Referrals { get; set; }
        public virtual DbSet<ReferralDocument> ReferralDocuments { get; set; }
        public virtual DbSet<ReferralProcedureCode> ReferralProcedureCodes { get; set; }
        public virtual DbSet<RefferingOffice> RefferingOffices { get; set; }
        public virtual DbSet<Relation> Relations { get; set; }
        public virtual DbSet<Room> Rooms { get; set; }
        public virtual DbSet<RoomTest> RoomTests { get; set; }
        public virtual DbSet<Schedule> Schedules { get; set; }
        public virtual DbSet<ScheduleDetail> ScheduleDetails { get; set; }
        public virtual DbSet<SchoolInformation> SchoolInformations { get; set; }
        public virtual DbSet<SocialMedia> SocialMedias { get; set; }
        public virtual DbSet<SpecialityDetail> SpecialityDetails { get; set; }
        public virtual DbSet<Specialty> Specialties { get; set; }
        public virtual DbSet<SpecialtyDetail> SpecialtyDetails { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }
        public virtual DbSet<Template> Templates { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserApiRoleMapping> UserApiRoleMappings { get; set; }
        public virtual DbSet<UserCompany> UserCompanies { get; set; }
        public virtual DbSet<UserCompanyRole> UserCompanyRoles { get; set; }
        public virtual DbSet<UserPersonalSetting> UserPersonalSettings { get; set; }
        public virtual DbSet<UserStatu> UserStatus { get; set; }
        public virtual DbSet<UserType> UserTypes { get; set; }
        public virtual DbSet<VisitCategory> VisitCategories { get; set; }
        public virtual DbSet<VisitDocument> VisitDocuments { get; set; }
        public virtual DbSet<VisitStatu> VisitStatus { get; set; }
        public virtual DbSet<VisitType> VisitTypes { get; set; }
        public virtual DbSet<DocumentNode> DocumentNodes { get; set; }
    
        public virtual ObjectResult<string> midas_sp_get_document_path(string document_node)
        {
            var document_nodeParameter = document_node != null ?
                new ObjectParameter("document_node", document_node) :
                new ObjectParameter("document_node", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("midas_sp_get_document_path", document_nodeParameter);
        }
    
        public virtual ObjectResult<sp_CaseGetReadOnly_Result> sp_CaseGetReadOnly(Nullable<int> caseId, Nullable<int> companyId)
        {
            var caseIdParameter = caseId.HasValue ?
                new ObjectParameter("CaseId", caseId) :
                new ObjectParameter("CaseId", typeof(int));
    
            var companyIdParameter = companyId.HasValue ?
                new ObjectParameter("CompanyId", companyId) :
                new ObjectParameter("CompanyId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<sp_CaseGetReadOnly_Result>("sp_CaseGetReadOnly", caseIdParameter, companyIdParameter);
        }
    
        public virtual int sp_DeleteCase(Nullable<int> caseId, Nullable<bool> hardDelete)
        {
            var caseIdParameter = caseId.HasValue ?
                new ObjectParameter("CaseId", caseId) :
                new ObjectParameter("CaseId", typeof(int));
    
            var hardDeleteParameter = hardDelete.HasValue ?
                new ObjectParameter("HardDelete", hardDelete) :
                new ObjectParameter("HardDelete", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_DeleteCase", caseIdParameter, hardDeleteParameter);
        }
    
        public virtual int sp_DeletePatient()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_DeletePatient");
        }
    
        public virtual int sp_DeleteUser(Nullable<int> userId, Nullable<bool> hardDelete)
        {
            var userIdParameter = userId.HasValue ?
                new ObjectParameter("UserId", userId) :
                new ObjectParameter("UserId", typeof(int));
    
            var hardDeleteParameter = hardDelete.HasValue ?
                new ObjectParameter("HardDelete", hardDelete) :
                new ObjectParameter("HardDelete", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("sp_DeleteUser", userIdParameter, hardDeleteParameter);
        }
    
        public virtual int spDeleteCase(Nullable<int> caseId, Nullable<bool> hardDelete)
        {
            var caseIdParameter = caseId.HasValue ?
                new ObjectParameter("CaseId", caseId) :
                new ObjectParameter("CaseId", typeof(int));
    
            var hardDeleteParameter = hardDelete.HasValue ?
                new ObjectParameter("HardDelete", hardDelete) :
                new ObjectParameter("HardDelete", typeof(bool));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spDeleteCase", caseIdParameter, hardDeleteParameter);
        }
    
        public virtual int spDeletePatient()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spDeletePatient");
        }
    }
}
