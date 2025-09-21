// محرر السيرة الذاتية

class ResumeEditor {
    constructor() {
        this.resumeData = {
            personal: {
                fullName: '',
                jobTitle: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            languages: []
        };
        
        this.currentSection = 'personal';
        this.currentTemplate = 'modern';
        
        this.init();
    }

    init() {
        this.loadSavedData();
        this.bindEvents();
        this.updatePreview();
        this.addSampleData();
    }

    bindEvents() {
        // التنقل بين الأقسام
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });

        // حفظ البيانات
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveData();
        });

        // معاينة
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });

        // تصدير PDF
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportToPDF();
        });

        // إغلاق المعاينة
        document.getElementById('closePreview').addEventListener('click', () => {
            this.closePreview();
        });

        document.getElementById('closePreviewBtn').addEventListener('click', () => {
            this.closePreview();
        });

        // تصدير من المعاينة
        document.getElementById('exportFromPreview').addEventListener('click', () => {
            this.exportToPDF();
        });

        // إضافة خبرة
        document.getElementById('addExperience').addEventListener('click', () => {
            this.addExperience();
        });

        // إضافة تعليم
        document.getElementById('addEducation').addEventListener('click', () => {
            this.addEducation();
        });

        // إضافة مهارة
        document.getElementById('addSkill').addEventListener('click', () => {
            this.addSkill();
        });

        // إضافة لغة
        document.getElementById('addLanguage').addEventListener('click', () => {
            this.addLanguage();
        });

        // تغيير القالب
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.changeTemplate(template);
            });
        });

        // مراقبة تغييرات النماذج
        this.bindFormEvents();
    }

    bindFormEvents() {
        // المعلومات الشخصية
        const personalFields = ['fullName', 'jobTitle', 'email', 'phone', 'location', 'website', 'summary'];
        personalFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.resumeData.personal[field] = e.target.value;
                    this.updatePreview();
                });
            }
        });
    }

    switchSection(section) {
        // إزالة الفئة النشطة من جميع العناصر
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll('.section-content').forEach(content => {
            content.classList.remove('active');
        });

        // إضافة الفئة النشطة للعنصر المحدد
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        document.getElementById(`${section}Section`).classList.add('active');

        // تحديث عنوان القسم
        const titles = {
            personal: 'المعلومات الشخصية',
            experience: 'الخبرات العملية',
            education: 'التعليم',
            skills: 'المهارات',
            languages: 'اللغات',
            template: 'القالب والألوان'
        };

        document.getElementById('sectionTitle').textContent = titles[section];
        this.currentSection = section;
    }

    addSampleData() {
        // بيانات تجريبية
        this.resumeData = {
            personal: {
                fullName: 'أحمد محمد علي',
                jobTitle: 'مطور واجهات أمامية',
                email: 'ahmed@example.com',
                phone: '+966 50 123 4567',
                location: 'الرياض، السعودية',
                website: 'www.ahmed-portfolio.com',
                summary: 'مطور واجهات أمامية متخصص في React و JavaScript مع خبرة 5 سنوات في تطوير تطبيقات الويب الحديثة والمتجاوبة. شغوف بإنشاء تجارب مستخدم استثنائية وحلول تقنية مبتكرة.'
            },
            experience: [
                {
                    id: 1,
                    position: 'مطور React أول',
                    company: 'شركة التقنية المتقدمة',
                    location: 'الرياض، السعودية',
                    startDate: '2022',
                    endDate: '2024',
                    current: false,
                    description: 'قيادة فريق من 4 مطورين في تطوير تطبيقات ويب معقدة باستخدام React و TypeScript. تحسين أداء التطبيقات بنسبة 40% وتطوير مكونات قابلة لإعادة الاستخدام.'
                },
                {
                    id: 2,
                    position: 'مطور واجهات أمامية',
                    company: 'ستارت أب تك',
                    location: 'جدة، السعودية',
                    startDate: '2020',
                    endDate: '2022',
                    current: false,
                    description: 'تطوير واجهات مستخدم تفاعلية ومتجاوبة لتطبيقات الجوال والويب. العمل مع فرق متعددة التخصصات لتحويل التصاميم إلى كود عالي الجودة.'
                }
            ],
            education: [
                {
                    id: 1,
                    degree: 'بكالوريوس علوم الحاسب',
                    institution: 'جامعة الملك سعود',
                    location: 'الرياض، السعودية',
                    startDate: '2016',
                    endDate: '2020',
                    gpa: '3.8/4.0'
                }
            ],
            skills: [
                { id: 1, name: 'React', level: 95 },
                { id: 2, name: 'JavaScript', level: 90 },
                { id: 3, name: 'TypeScript', level: 85 },
                { id: 4, name: 'CSS/SCSS', level: 88 },
                { id: 5, name: 'Node.js', level: 75 },
                { id: 6, name: 'Git', level: 85 }
            ],
            languages: [
                { id: 1, name: 'العربية', level: 'اللغة الأم' },
                { id: 2, name: 'الإنجليزية', level: 'متقدم' },
                { id: 3, name: 'الفرنسية', level: 'متوسط' }
            ]
        };

        this.populateForm();
        this.renderExperience();
        this.renderEducation();
        this.renderSkills();
        this.renderLanguages();
        this.updatePreview();
    }

    populateForm() {
        // ملء النموذج بالبيانات
        Object.keys(this.resumeData.personal).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = this.resumeData.personal[key];
            }
        });
    }

    addExperience() {
        const newExperience = {
            id: Date.now(),
            position: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        };

        this.resumeData.experience.push(newExperience);
        this.renderExperience();
        this.updatePreview();
    }

    renderExperience() {
        const container = document.getElementById('experienceList');
        container.innerHTML = '';

        this.resumeData.experience.forEach((exp, index) => {
            const expElement = document.createElement('div');
            expElement.className = 'experience-item';
            expElement.innerHTML = `
                <div class="item-header">
                    <span class="item-title">خبرة عمل ${index + 1}</span>
                    <div class="item-actions">
                        <button class="btn-icon btn-delete" onclick="editor.removeExperience(${exp.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>المسمى الوظيفي</label>
                        <input type="text" value="${exp.position}" onchange="editor.updateExperience(${exp.id}, 'position', this.value)">
                    </div>
                    <div class="form-group">
                        <label>اسم الشركة</label>
                        <input type="text" value="${exp.company}" onchange="editor.updateExperience(${exp.id}, 'company', this.value)">
                    </div>
                    <div class="form-group">
                        <label>الموقع</label>
                        <input type="text" value="${exp.location}" onchange="editor.updateExperience(${exp.id}, 'location', this.value)">
                    </div>
                    <div class="form-group">
                        <label>تاريخ البداية</label>
                        <input type="text" value="${exp.startDate}" onchange="editor.updateExperience(${exp.id}, 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label>تاريخ النهاية</label>
                        <input type="text" value="${exp.endDate}" onchange="editor.updateExperience(${exp.id}, 'endDate', this.value)" ${exp.current ? 'disabled' : ''}>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" ${exp.current ? 'checked' : ''} onchange="editor.updateExperience(${exp.id}, 'current', this.checked)">
                            أعمل حالياً
                        </label>
                    </div>
                </div>
                <div class="form-group full-width">
                    <label>وصف المهام والإنجازات</label>
                    <textarea rows="3" onchange="editor.updateExperience(${exp.id}, 'description', this.value)">${exp.description}</textarea>
                </div>
            `;
            container.appendChild(expElement);
        });
    }

    updateExperience(id, field, value) {
        const experience = this.resumeData.experience.find(exp => exp.id === id);
        if (experience) {
            experience[field] = value;
            this.updatePreview();
        }
    }

    removeExperience(id) {
        this.resumeData.experience = this.resumeData.experience.filter(exp => exp.id !== id);
        this.renderExperience();
        this.updatePreview();
    }

    addEducation() {
        const newEducation = {
            id: Date.now(),
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            gpa: ''
        };

        this.resumeData.education.push(newEducation);
        this.renderEducation();
        this.updatePreview();
    }

    renderEducation() {
        const container = document.getElementById('educationList');
        container.innerHTML = '';

        this.resumeData.education.forEach((edu, index) => {
            const eduElement = document.createElement('div');
            eduElement.className = 'education-item';
            eduElement.innerHTML = `
                <div class="item-header">
                    <span class="item-title">تعليم ${index + 1}</span>
                    <div class="item-actions">
                        <button class="btn-icon btn-delete" onclick="editor.removeEducation(${edu.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>الدرجة العلمية</label>
                        <input type="text" value="${edu.degree}" onchange="editor.updateEducation(${edu.id}, 'degree', this.value)">
                    </div>
                    <div class="form-group">
                        <label>اسم المؤسسة</label>
                        <input type="text" value="${edu.institution}" onchange="editor.updateEducation(${edu.id}, 'institution', this.value)">
                    </div>
                    <div class="form-group">
                        <label>الموقع</label>
                        <input type="text" value="${edu.location}" onchange="editor.updateEducation(${edu.id}, 'location', this.value)">
                    </div>
                    <div class="form-group">
                        <label>تاريخ البداية</label>
                        <input type="text" value="${edu.startDate}" onchange="editor.updateEducation(${edu.id}, 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label>تاريخ النهاية</label>
                        <input type="text" value="${edu.endDate}" onchange="editor.updateEducation(${edu.id}, 'endDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label>المعدل</label>
                        <input type="text" value="${edu.gpa}" onchange="editor.updateEducation(${edu.id}, 'gpa', this.value)">
                    </div>
                </div>
            `;
            container.appendChild(eduElement);
        });
    }

    updateEducation(id, field, value) {
        const education = this.resumeData.education.find(edu => edu.id === id);
        if (education) {
            education[field] = value;
            this.updatePreview();
        }
    }

    removeEducation(id) {
        this.resumeData.education = this.resumeData.education.filter(edu => edu.id !== id);
        this.renderEducation();
        this.updatePreview();
    }

    addSkill() {
        const newSkill = {
            id: Date.now(),
            name: '',
            level: 50
        };

        this.resumeData.skills.push(newSkill);
        this.renderSkills();
        this.updatePreview();
    }

    renderSkills() {
        const container = document.getElementById('skillsList');
        container.innerHTML = '';

        this.resumeData.skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.innerHTML = `
                <div class="skill-info">
                    <input type="text" class="skill-name" value="${skill.name}" placeholder="اسم المهارة" onchange="editor.updateSkill(${skill.id}, 'name', this.value)">
                    <div class="skill-level">
                        <span>المستوى:</span>
                        <input type="range" class="skill-slider" min="0" max="100" value="${skill.level}" onchange="editor.updateSkill(${skill.id}, 'level', this.value)">
                        <span class="skill-percentage">${skill.level}%</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-delete" onclick="editor.removeSkill(${skill.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(skillElement);
        });
    }

    updateSkill(id, field, value) {
        const skill = this.resumeData.skills.find(s => s.id === id);
        if (skill) {
            skill[field] = field === 'level' ? parseInt(value) : value;
            if (field === 'level') {
                // تحديث النسبة المعروضة
                const skillElement = document.querySelector(`[onchange*="${id}"][type="range"]`).parentElement;
                skillElement.querySelector('.skill-percentage').textContent = value + '%';
            }
            this.updatePreview();
        }
    }

    removeSkill(id) {
        this.resumeData.skills = this.resumeData.skills.filter(s => s.id !== id);
        this.renderSkills();
        this.updatePreview();
    }

    addLanguage() {
        const newLanguage = {
            id: Date.now(),
            name: '',
            level: 'مبتدئ'
        };

        this.resumeData.languages.push(newLanguage);
        this.renderLanguages();
        this.updatePreview();
    }

    renderLanguages() {
        const container = document.getElementById('languagesList');
        container.innerHTML = '';

        this.resumeData.languages.forEach(lang => {
            const langElement = document.createElement('div');
            langElement.className = 'language-item';
            langElement.innerHTML = `
                <div class="form-grid">
                    <div class="form-group">
                        <label>اسم اللغة</label>
                        <input type="text" value="${lang.name}" onchange="editor.updateLanguage(${lang.id}, 'name', this.value)">
                    </div>
                    <div class="form-group">
                        <label>المستوى</label>
                        <select onchange="editor.updateLanguage(${lang.id}, 'level', this.value)">
                            <option value="مبتدئ" ${lang.level === 'مبتدئ' ? 'selected' : ''}>مبتدئ</option>
                            <option value="متوسط" ${lang.level === 'متوسط' ? 'selected' : ''}>متوسط</option>
                            <option value="متقدم" ${lang.level === 'متقدم' ? 'selected' : ''}>متقدم</option>
                            <option value="اللغة الأم" ${lang.level === 'اللغة الأم' ? 'selected' : ''}>اللغة الأم</option>
                        </select>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon btn-delete" onclick="editor.removeLanguage(${lang.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(langElement);
        });
    }

    updateLanguage(id, field, value) {
        const language = this.resumeData.languages.find(l => l.id === id);
        if (language) {
            language[field] = value;
            this.updatePreview();
        }
    }

    removeLanguage(id) {
        this.resumeData.languages = this.resumeData.languages.filter(l => l.id !== id);
        this.renderLanguages();
        this.updatePreview();
    }

    changeTemplate(template) {
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        
        document.querySelector(`[data-template="${template}"]`).classList.add('active');
        this.currentTemplate = template;
        this.updatePreview();
    }

    updatePreview() {
        const preview = document.getElementById('resumePreview');
        preview.innerHTML = this.generateResumeHTML();
    }

    generateResumeHTML() {
        const { personal, experience, education, skills, languages } = this.resumeData;
        
        return `
            <div class="resume-header">
                <h1 class="resume-name">${personal.fullName || 'اسمك الكامل'}</h1>
                <p class="resume-title">${personal.jobTitle || 'المسمى الوظيفي'}</p>
                <div class="resume-contact">
                    ${personal.email ? `<div class="contact-item"><i class="fas fa-envelope"></i> ${personal.email}</div>` : ''}
                    ${personal.phone ? `<div class="contact-item"><i class="fas fa-phone"></i> ${personal.phone}</div>` : ''}
                    ${personal.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${personal.location}</div>` : ''}
                    ${personal.website ? `<div class="contact-item"><i class="fas fa-globe"></i> ${personal.website}</div>` : ''}
                </div>
            </div>

            ${personal.summary ? `
                <div class="resume-section">
                    <h3><i class="fas fa-user"></i> نبذة شخصية</h3>
                    <p class="resume-summary">${personal.summary}</p>
                </div>
            ` : ''}

            ${experience.length > 0 ? `
                <div class="resume-section">
                    <h3><i class="fas fa-briefcase"></i> الخبرات العملية</h3>
                    ${experience.map(exp => `
                        <div class="experience-entry">
                            <div class="entry-header">
                                <div>
                                    <div class="entry-title">${exp.position}</div>
                                    <div class="entry-company">${exp.company}</div>
                                    <div class="entry-location">${exp.location}</div>
                                </div>
                                <div class="entry-date">${exp.startDate} - ${exp.current ? 'الحالي' : exp.endDate}</div>
                            </div>
                            ${exp.description ? `<div class="entry-description">${exp.description}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${education.length > 0 ? `
                <div class="resume-section">
                    <h3><i class="fas fa-graduation-cap"></i> التعليم</h3>
                    ${education.map(edu => `
                        <div class="education-entry">
                            <div class="entry-header">
                                <div>
                                    <div class="entry-title">${edu.degree}</div>
                                    <div class="entry-company">${edu.institution}</div>
                                    <div class="entry-location">${edu.location}</div>
                                    ${edu.gpa ? `<div class="entry-location">المعدل: ${edu.gpa}</div>` : ''}
                                </div>
                                <div class="entry-date">${edu.startDate} - ${edu.endDate}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            ${skills.length > 0 ? `
                <div class="resume-section">
                    <h3><i class="fas fa-star"></i> المهارات</h3>
                    <div class="skills-grid">
                        ${skills.map(skill => `
                            <div class="skill-entry">
                                <div class="skill-header">
                                    <span class="skill-name-preview">${skill.name}</span>
                                    <span class="skill-percentage-preview">${skill.level}%</span>
                                </div>
                                <div class="skill-bar">
                                    <div class="skill-fill" style="width: ${skill.level}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            ${languages.length > 0 ? `
                <div class="resume-section">
                    <h3><i class="fas fa-language"></i> اللغات</h3>
                    <div class="languages-grid">
                        ${languages.map(lang => `
                            <div class="language-entry">
                                <span class="language-name">${lang.name}</span>
                                <span class="language-level">${lang.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    showPreview() {
        const modal = document.getElementById('previewModal');
        const fullPreview = document.getElementById('fullPreview');
        
        fullPreview.innerHTML = this.generateResumeHTML();
        modal.classList.add('active');
    }

    closePreview() {
        const modal = document.getElementById('previewModal');
        modal.classList.remove('active');
    }

    saveData() {
        try {
            localStorage.setItem('resumeData', JSON.stringify(this.resumeData));
            localStorage.setItem('currentTemplate', this.currentTemplate);
            
            if (window.ResumeBuilder && window.ResumeBuilder.showNotification) {
                window.ResumeBuilder.showNotification('تم حفظ البيانات بنجاح', 'success');
            } else {
                alert('تم حفظ البيانات بنجاح');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            if (window.ResumeBuilder && window.ResumeBuilder.showNotification) {
                window.ResumeBuilder.showNotification('حدث خطأ أثناء الحفظ', 'error');
            } else {
                alert('حدث خطأ أثناء الحفظ');
            }
        }
    }

    loadSavedData() {
        try {
            const savedData = localStorage.getItem('resumeData');
            const savedTemplate = localStorage.getItem('currentTemplate');
            
            if (savedData) {
                this.resumeData = JSON.parse(savedData);
                this.populateForm();
                this.renderExperience();
                this.renderEducation();
                this.renderSkills();
                this.renderLanguages();
            }
            
            if (savedTemplate) {
                this.currentTemplate = savedTemplate;
                this.changeTemplate(savedTemplate);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    async exportToPDF() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('active');

        try {
            // إنشاء عنصر مؤقت للطباعة
            const printElement = document.createElement('div');
            printElement.style.cssText = `
                position: absolute;
                left: -9999px;
                top: -9999px;
                width: 794px;
                background: white;
                padding: 40px;
                font-family: 'Cairo', sans-serif;
                color: #333;
                line-height: 1.6;
            `;
            
            printElement.innerHTML = this.generatePrintHTML();
            document.body.appendChild(printElement);

            // تحويل إلى canvas
            const canvas = await html2canvas(printElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            // إزالة العنصر المؤقت
            document.body.removeChild(printElement);

            // إنشاء PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            
            let position = 0;
            
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // حفظ الملف
            const fileName = `${this.resumeData.personal.fullName.replace(/\s+/g, '_') || 'Resume'}.pdf`;
            pdf.save(fileName);
            
            if (window.ResumeBuilder && window.ResumeBuilder.showNotification) {
                window.ResumeBuilder.showNotification('تم تصدير السيرة الذاتية بنجاح', 'success');
            }
            
        } catch (error) {
            console.error('Error exporting PDF:', error);
            if (window.ResumeBuilder && window.ResumeBuilder.showNotification) {
                window.ResumeBuilder.showNotification('حدث خطأ أثناء التصدير', 'error');
            } else {
                alert('حدث خطأ أثناء التصدير');
            }
        } finally {
            loadingOverlay.classList.remove('active');
        }
    }

    generatePrintHTML() {
        const { personal, experience, education, skills, languages } = this.resumeData;
        
        return `
            <div style="max-width: 794px; margin: 0 auto; background: white; color: #333;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #6366F1; padding-bottom: 20px;">
                    <h1 style="font-size: 32px; font-weight: bold; color: #1F2937; margin: 0 0 8px 0;">
                        ${personal.fullName || 'اسمك الكامل'}
                    </h1>
                    <p style="font-size: 20px; color: #6366F1; margin: 0 0 16px 0;">
                        ${personal.jobTitle || 'المسمى الوظيفي'}
                    </p>
                    <div style="display: flex; justify-content: center; gap: 20px; font-size: 14px; color: #6B7280; flex-wrap: wrap;">
                        ${personal.email ? `<span>📧 ${personal.email}</span>` : ''}
                        ${personal.phone ? `<span>📱 ${personal.phone}</span>` : ''}
                        ${personal.location ? `<span>📍 ${personal.location}</span>` : ''}
                        ${personal.website ? `<span>🌐 ${personal.website}</span>` : ''}
                    </div>
                </div>

                ${personal.summary ? `
                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 20px; font-weight: bold; color: #1F2937; margin: 0 0 12px 0; border-bottom: 2px solid #6366F1; padding-bottom: 5px;">
                            👤 نبذة شخصية
                        </h2>
                        <p style="line-height: 1.6; color: #374151; margin: 0;">
                            ${personal.summary}
                        </p>
                    </div>
                ` : ''}

                ${experience.length > 0 ? `
                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 20px; font-weight: bold; color: #1F2937; margin: 0 0 16px 0; border-bottom: 2px solid #6366F1; padding-bottom: 5px;">
                            💼 الخبرات العملية
                        </h2>
                        ${experience.map(exp => `
                            <div style="margin-bottom: 20px; border-right: 3px solid #E5E7EB; padding-right: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                                    <div>
                                        <h3 style="font-size: 16px; font-weight: 600; color: #1F2937; margin: 0 0 4px 0;">
                                            ${exp.position}
                                        </h3>
                                        <p style="font-size: 14px; color: #6366F1; font-weight: 500; margin: 0 0 2px 0;">
                                            ${exp.company}
                                        </p>
                                        <p style="font-size: 12px; color: #6B7280; margin: 0;">
                                            ${exp.location}
                                        </p>
                                    </div>
                                    <span style="font-size: 12px; color: #6B7280; background: #F3F4F6; padding: 4px 8px; border-radius: 4px; white-space: nowrap;">
                                        ${exp.startDate} - ${exp.current ? 'الحالي' : exp.endDate}
                                    </span>
                                </div>
                                ${exp.description ? `
                                    <p style="font-size: 13px; color: #374151; line-height: 1.5; margin: 0;">
                                        ${exp.description}
                                    </p>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${education.length > 0 ? `
                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 20px; font-weight: bold; color: #1F2937; margin: 0 0 16px 0; border-bottom: 2px solid #6366F1; padding-bottom: 5px;">
                            🎓 التعليم
                        </h2>
                        ${education.map(edu => `
                            <div style="margin-bottom: 16px; border-right: 3px solid #E5E7EB; padding-right: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: start;">
                                    <div>
                                        <h3 style="font-size: 16px; font-weight: 600; color: #1F2937; margin: 0 0 4px 0;">
                                            ${edu.degree}
                                        </h3>
                                        <p style="font-size: 14px; color: #6366F1; margin: 0 0 2px 0;">
                                            ${edu.institution}
                                        </p>
                                        <p style="font-size: 12px; color: #6B7280; margin: 0;">
                                            ${edu.location}
                                        </p>
                                        ${edu.gpa ? `
                                            <p style="font-size: 12px; color: #6B7280; margin: 2px 0 0 0;">
                                                المعدل: ${edu.gpa}
                                            </p>
                                        ` : ''}
                                    </div>
                                    <span style="font-size: 12px; color: #6B7280; background: #F3F4F6; padding: 4px 8px; border-radius: 4px; white-space: nowrap;">
                                        ${edu.startDate} - ${edu.endDate}
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${skills.length > 0 ? `
                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 20px; font-weight: bold; color: #1F2937; margin: 0 0 16px 0; border-bottom: 2px solid #6366F1; padding-bottom: 5px;">
                            🏆 المهارات
                        </h2>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                            ${skills.map(skill => `
                                <div style="margin-bottom: 8px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                                        <span style="font-size: 14px; font-weight: 500; color: #1F2937;">
                                            ${skill.name}
                                        </span>
                                        <span style="font-size: 12px; color: #6B7280;">
                                            ${skill.level}%
                                        </span>
                                    </div>
                                    <div style="width: 100%; background: #E5E7EB; border-radius: 4px; height: 6px;">
                                        <div style="background: #6366F1; height: 6px; border-radius: 4px; width: ${skill.level}%;"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                ${languages.length > 0 ? `
                    <div>
                        <h2 style="font-size: 20px; font-weight: bold; color: #1F2937; margin: 0 0 16px 0; border-bottom: 2px solid #6366F1; padding-bottom: 5px;">
                            🌍 اللغات
                        </h2>
                        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                            ${languages.map(lang => `
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="font-size: 14px; font-weight: 500; color: #1F2937;">
                                        ${lang.name}
                                    </span>
                                    <span style="font-size: 12px; background: #F3F4F6; color: #6B7280; padding: 2px 8px; border-radius: 12px;">
                                        ${lang.level}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

// تهيئة المحرر عند تحميل الصفحة
let editor;
document.addEventListener('DOMContentLoaded', function() {
    editor = new ResumeEditor();
});

