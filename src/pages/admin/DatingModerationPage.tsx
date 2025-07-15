import React, { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import DatingModerationHeader from '@/components/dating/DatingModerationHeader';
import DatingModerationFilters from '@/components/dating/DatingModerationFilters';
import DatingModerationTabs from '@/components/dating/DatingModerationTabs';
import DatingModerationContent from '@/components/dating/DatingModerationContent';

interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  gender: 'Мужчина' | 'Женщина';
  lookingFor: 'Мужчина' | 'Женщина';
  about: string;
  photo: string;
  isApproved: boolean;
  createdAt: string;
}

const DatingModerationPage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [pendingProfiles, setPendingProfiles] = useState<Profile[]>([]);
  const [approvedProfiles, setApprovedProfiles] = useState<Profile[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [selectedProfiles, setSelectedProfiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = localStorage.getItem('datingProfiles');
    if (savedProfiles) {
      const allProfiles: Profile[] = JSON.parse(savedProfiles);
      
      console.log('Загружены профили в админке:', allProfiles.map(p => ({
        id: p.id,
        name: p.name,
        hasPhoto: !!p.photo,
        photoLength: p.photo?.length || 0,
        isApproved: p.isApproved
      })));
      
      setProfiles(allProfiles);
      setPendingProfiles(allProfiles.filter(p => !p.isApproved));
      setApprovedProfiles(allProfiles.filter(p => p.isApproved));
    }
  };

  const approveProfile = (profileId: string) => {
    const updatedProfiles = profiles.map(profile => 
      profile.id === profileId 
        ? { ...profile, isApproved: true }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета одобрена",
      description: "Анкета теперь отображается на странице знакомств",
    });
  };

  const rejectProfile = (profileId: string) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета отклонена",
      description: "Анкета была удалена из системы",
      variant: "destructive",
    });
  };

  const hideProfile = (profileId: string) => {
    const updatedProfiles = profiles.map(profile => 
      profile.id === profileId 
        ? { ...profile, isApproved: false }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    
    toast({
      title: "Анкета скрыта",
      description: "Анкета больше не отображается на странице знакомств",
    });
  };

  const getFilteredProfiles = (profilesList: Profile[]) => {
    return profilesList.filter(profile => {
      const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.about.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender === 'all' || profile.gender === filterGender;
      const matchesCity = filterCity === 'all' || profile.city === filterCity;
      
      return matchesSearch && matchesGender && matchesCity;
    });
  };

  const getUniqueCities = () => {
    const cities = profiles.map(p => p.city);
    return Array.from(new Set(cities)).sort();
  };

  const handleBulkApprove = () => {
    const updatedProfiles = profiles.map(profile => 
      selectedProfiles.has(profile.id) 
        ? { ...profile, isApproved: true }
        : profile
    );
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    setSelectedProfiles(new Set());
    
    toast({
      title: "Анкеты одобрены",
      description: `Одобрено ${selectedProfiles.size} анкет`,
    });
  };

  const handleBulkReject = () => {
    const updatedProfiles = profiles.filter(profile => !selectedProfiles.has(profile.id));
    
    localStorage.setItem('datingProfiles', JSON.stringify(updatedProfiles));
    setProfiles(updatedProfiles);
    setPendingProfiles(updatedProfiles.filter(p => !p.isApproved));
    setApprovedProfiles(updatedProfiles.filter(p => p.isApproved));
    setSelectedProfiles(new Set());
    
    toast({
      title: "Анкеты отклонены",
      description: `Отклонено ${selectedProfiles.size} анкет`,
      variant: "destructive",
    });
  };

  const toggleProfileSelection = (profileId: string) => {
    const newSelected = new Set(selectedProfiles);
    if (newSelected.has(profileId)) {
      newSelected.delete(profileId);
    } else {
      newSelected.add(profileId);
    }
    setSelectedProfiles(newSelected);
  };

  const handleAddTestProfile = () => {
    const testProfile: Profile = {
      id: 'test-' + Date.now(),
      name: 'Тестовый пользователь',
      age: 25,
      city: 'Москва',
      gender: 'Мужчина',
      lookingFor: 'Женщина',
      about: 'Тестовый профиль с фото',
      photo: 'https://cdn.poehali.dev/files/868a1cb8-70cc-43bc-ae94-d218f551716e.png',
      isApproved: false,
      createdAt: new Date().toISOString()
    };
    
    const savedProfiles = localStorage.getItem('datingProfiles');
    const existingProfiles: Profile[] = savedProfiles ? JSON.parse(savedProfiles) : [];
    existingProfiles.push(testProfile);
    localStorage.setItem('datingProfiles', JSON.stringify(existingProfiles));
    loadProfiles();
  };

  const filteredPending = getFilteredProfiles(pendingProfiles);
  const filteredApproved = getFilteredProfiles(approvedProfiles);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      <DatingModerationHeader
        totalProfiles={profiles.length}
        pendingCount={pendingProfiles.length}
        approvedCount={approvedProfiles.length}
      />

      <div className="max-w-7xl mx-auto p-6">
        <DatingModerationFilters
          searchTerm={searchTerm}
          filterGender={filterGender}
          filterCity={filterCity}
          uniqueCities={getUniqueCities()}
          onSearchChange={setSearchTerm}
          onGenderChange={setFilterGender}
          onCityChange={setFilterCity}
        />

        <DatingModerationTabs
          activeTab={activeTab}
          pendingCount={filteredPending.length}
          approvedCount={filteredApproved.length}
          selectedProfiles={selectedProfiles}
          onTabChange={setActiveTab}
          onBulkApprove={handleBulkApprove}
          onBulkReject={handleBulkReject}
          onAddTestProfile={handleAddTestProfile}
        />

        <DatingModerationContent
          activeTab={activeTab}
          filteredPending={filteredPending}
          filteredApproved={filteredApproved}
          pendingTotal={pendingProfiles.length}
          approvedTotal={approvedProfiles.length}
          selectedProfiles={selectedProfiles}
          onToggleSelection={toggleProfileSelection}
          onApprove={approveProfile}
          onReject={rejectProfile}
          onHide={hideProfile}
        />
      </div>
    </div>
  );
};

export default DatingModerationPage;