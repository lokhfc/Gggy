import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header
      "dashboard": "Dashboard",
      "explore": "Explore",
      "profile": "Profile",
      "search_placeholder": "Search repositories, users, organizations...",
      "notifications": "Notifications",
      "new_repository": "New Repository",
      "sign_out": "Sign out",
      "settings": "Settings",
      "your_profile": "Your profile",
      
      // Auth
      "sign_in": "Sign In",
      "sign_up": "Sign Up",
      "email": "Email",
      "password": "Password",
      "confirm_password": "Confirm Password",
      "username": "Username",
      "full_name": "Full Name",
      "already_have_account": "Already have an account?",
      "dont_have_account": "Don't have an account?",
      "create_account": "Create Account",
      "welcome_back": "Welcome back!",
      "join_github": "Join GitHub",
      "forgot_password": "Forgot password?",
      
      // Dashboard
      "welcome_back_user": "Welcome back, {{name}}! 👋",
      "ready_to_build": "Ready to build something amazing today? Your repositories are waiting.",
      "import_repository": "Import Repository",
      "all_repositories": "All repositories",
      "public_repositories": "Public repositories", 
      "private_repositories": "Private repositories",
      "recently_updated": "Recently updated",
      "recent_activity": "Recent Activity",
      "your_stats": "Your Stats",
      "total_repositories": "Total repositories",
      "total_stars": "Total stars received",
      "followers": "Followers",
      "following": "Following",
      
      // Repository
      "stars": "stars",
      "forks": "forks",
      "watching": "watching",
      "star": "Star",
      "fork": "Fork",
      "code": "Code",
      "issues": "Issues",
      "pull_requests": "Pull requests",
      "actions": "Actions",
      "security": "Security",
      "insights": "Insights",
      "clone": "Clone",
      "last_commit": "Last commit",
      "collaborators": "Collaborators",
      "add_collaborator": "Add Collaborator",
      "manage_access": "Manage Access",
      "invite_collaborator": "Invite collaborator",
      "language_breakdown": "Language Breakdown",
      
      // Explore
      "explore_github": "Explore GitHub",
      "discover_trending": "Discover trending repositories, amazing developers, and exciting projects from around the world",
      "trending": "Trending",
      "repositories": "Repositories",
      "users": "Users",
      "today": "Today",
      "this_week": "This Week",
      "this_month": "This Month",
      "stars_today": "stars today",
      "follow": "Follow",
      
      // Settings
      "profile_settings": "Profile Settings",
      "account_settings": "Account Settings",
      "notification_settings": "Notifications",
      "security_settings": "Security",
      "language_settings": "Language & Region",
      "appearance": "Appearance",
      "change_avatar": "Change avatar",
      "name": "Name",
      "bio": "Bio",
      "location": "Location",
      "website": "Website",
      "company": "Company",
      "save_changes": "Save changes",
      "dark_mode": "Dark mode",
      "light_mode": "Light mode",
      "system_theme": "System theme",
      "language": "Language",
      "time_zone": "Time zone",
      
      // AI Chat
      "ai_assistant": "AI Assistant",
      "always_here": "Always here to help",
      "ask_anything": "Ask me anything about coding...",
      
      // Search
      "search_results": "Search Results",
      "no_results": "No results found",
      "search_repositories": "Search repositories",
      "search_users": "Search users",
      "advanced_search": "Advanced search",
      "filter_by_language": "Filter by language",
      "sort_by": "Sort by",
      "best_match": "Best match"
    }
  },
  ru: {
    translation: {
      // Header
      "dashboard": "Панель",
      "explore": "Обзор",
      "profile": "Профиль",
      "search_placeholder": "Поиск репозиториев, пользователей, организаций...",
      "notifications": "Уведомления",
      "new_repository": "Новый репозиторий",
      "sign_out": "Выйти",
      "settings": "Настройки",
      "your_profile": "Ваш профиль",
      
      // Auth
      "sign_in": "Войти",
      "sign_up": "Регистрация",
      "email": "Электронная почта",
      "password": "Пароль",
      "confirm_password": "Подтвердите пароль",
      "username": "Имя пользователя",
      "full_name": "Полное имя",
      "already_have_account": "Уже есть аккаунт?",
      "dont_have_account": "Нет аккаунта?",
      "create_account": "Создать аккаунт",
      "welcome_back": "С возвращением!",
      "join_github": "Присоединиться к GitHub",
      "forgot_password": "Забыли пароль?",
      
      // Dashboard
      "welcome_back_user": "С возвращением, {{name}}! 👋",
      "ready_to_build": "Готовы создать что-то потрясающее сегодня? Ваши репозитории ждут.",
      "import_repository": "Импорт репозитория",
      "all_repositories": "Все репозитории",
      "public_repositories": "Публичные репозитории",
      "private_repositories": "Приватные репозитории", 
      "recently_updated": "Недавно обновленные",
      "recent_activity": "Недавняя активность",
      "your_stats": "Ваша статистика",
      "total_repositories": "Всего репозиториев",
      "total_stars": "Всего звезд получено",
      "followers": "Подписчики",
      "following": "Подписки",
      
      // Repository
      "stars": "звезд",
      "forks": "форков",
      "watching": "наблюдают",
      "star": "Звезда",
      "fork": "Форк",
      "code": "Код",
      "issues": "Задачи",
      "pull_requests": "Pull requests",
      "actions": "Действия",
      "security": "Безопасность",
      "Insights": "Аналитика",
      "clone": "Клонировать",
      "last_commit": "Последний коммит",
      "collaborators": "Соавторы",
      "add_collaborator": "Добавить соавтора",
      "manage_access": "Управление доступом",
      "invite_collaborator": "Пригласить соавтора",
      "language_breakdown": "Разбивка по языкам",
      
      // Explore
      "explore_github": "Обзор GitHub",
      "discover_trending": "Откройте для себя популярные репозитории, удивительных разработчиков и интересные проекты со всего мира",
      "trending": "В тренде",
      "repositories": "Репозитории",
      "users": "Пользователи",
      "today": "Сегодня",
      "this_week": "На этой неделе",
      "this_month": "В этом месяце",
      "stars_today": "звезд сегодня",
      "follow": "Подписаться",
      
      // Settings
      "profile_settings": "Настройки профиля",
      "account_settings": "Настройки аккаунта",
      "notification_settings": "Уведомления",
      "security_settings": "Безопасность",
      "language_settings": "Язык и регион",
      "appearance": "Внешний вид",
      "change_avatar": "Изменить аватар",
      "name": "Имя",
      "bio": "О себе",
      "location": "Местоположение",
      "website": "Веб-сайт",
      "company": "Компания",
      "save_changes": "Сохранить изменения",
      "dark_mode": "Темная тема",
      "light_mode": "Светлая тема",
      "system_theme": "Системная тема",
      "language": "Язык",
      "time_zone": "Часовой пояс",
      
      // AI Chat
      "ai_assistant": "ИИ Ассистент",
      "always_here": "Всегда готов помочь",
      "ask_anything": "Спросите меня что-нибудь о программировании...",
      
      // Search
      "search_results": "Результаты поиска",
      "no_results": "Результаты не найдены",
      "search_repositories": "Поиск репозиториев",
      "search_users": "Поиск пользователей",
      "advanced_search": "Расширенный поиск",
      "filter_by_language": "Фильтр по языку",
      "sort_by": "Сортировать по",
      "best_match": "Лучшее совпадение"
    }
  },
  zh: {
    translation: {
      // Header
      "dashboard": "仪表板",
      "explore": "探索",
      "profile": "个人资料",
      "search_placeholder": "搜索存储库、用户、组织...",
      "notifications": "通知",
      "new_repository": "新建存储库",
      "sign_out": "退出",
      "settings": "设置",
      "your_profile": "您的个人资料",
      
      // Auth
      "sign_in": "登录",
      "sign_up": "注册",
      "email": "电子邮件",
      "password": "密码",
      "confirm_password": "确认密码",
      "username": "用户名",
      "full_name": "全名",
      "already_have_account": "已有账户？",
      "dont_have_account": "没有账户？",
      "create_account": "创建账户",
      "welcome_back": "欢迎回来！",
      "join_github": "加入 GitHub",
      "forgot_password": "忘记密码？",
      
      // Dashboard
      "welcome_back_user": "欢迎回来，{{name}}！ 👋",
      "ready_to_build": "准备好今天构建一些令人惊叹的东西吗？您的存储库正在等待。",
      "import_repository": "导入存储库",
      "all_repositories": "所有存储库",
      "public_repositories": "公共存储库",
      "private_repositories": "私有存储库",
      "recently_updated": "最近更新",
      "recent_activity": "最近活动",
      "your_stats": "您的统计",
      "total_repositories": "总存储库",
      "total_stars": "总收到星标",
      "followers": "关注者",
      "following": "正在关注",
      
      // Repository
      "stars": "星标",
      "forks": "分叉",
      "watching": "关注",
      "star": "星标",
      "fork": "分叉",
      "code": "代码",
      "issues": "问题",
      "pull_requests": "拉取请求",
      "actions": "操作",
      "security": "安全",
      "insights": "洞察",
      "clone": "克隆",
      "last_commit": "最后提交",
      "collaborators": "协作者",
      "add_collaborator": "添加协作者",
      "manage_access": "管理访问",
      "invite_collaborator": "邀请协作者",
      "language_breakdown": "语言分析",
      
      // Explore
      "explore_github": "探索 GitHub",
      "discover_trending": "发现来自世界各地的热门存储库、优秀开发者和精彩项目",
      "trending": "热门",
      "repositories": "存储库",
      "users": "用户",
      "today": "今天",
      "this_week": "本周",
      "this_month": "本月",
      "stars_today": "今日星标",
      "follow": "关注",
      
      // Settings
      "profile_settings": "个人资料设置",
      "account_settings": "账户设置",
      "notification_settings": "通知设置",
      "security_settings": "安全设置",
      "language_settings": "语言和地区",
      "appearance": "外观",
      "change_avatar": "更改头像",
      "name": "姓名",
      "bio": "简介",
      "location": "位置",
      "website": "网站",
      "company": "公司",
      "save_changes": "保存更改",
      "dark_mode": "深色模式",
      "light_mode": "浅色模式",
      "system_theme": "系统主题",
      "language": "语言",
      "time_zone": "时区",
      
      // AI Chat
      "ai_assistant": "AI 助手",
      "always_here": "随时为您服务",
      "ask_anything": "问我任何关于编程的问题...",
      
      // Search
      "search_results": "搜索结果",
      "no_results": "未找到结果",
      "search_repositories": "搜索存储库",
      "search_users": "搜索用户",
      "advanced_search": "高级搜索",
      "filter_by_language": "按语言筛选",
      "sort_by": "排序方式",
      "best_match": "最佳匹配"
    }
  },
  es: {
    translation: {
      // Header
      "dashboard": "Panel",
      "explore": "Explorar",
      "profile": "Perfil",
      "search_placeholder": "Buscar repositorios, usuarios, organizaciones...",
      "notifications": "Notificaciones",
      "new_repository": "Nuevo Repositorio",
      "sign_out": "Cerrar sesión",
      "settings": "Configuración",
      "your_profile": "Tu perfil",
      
      // Auth
      "sign_in": "Iniciar Sesión",
      "sign_up": "Registrarse",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "confirm_password": "Confirmar contraseña",
      "username": "Nombre de usuario",
      "full_name": "Nombre completo",
      "already_have_account": "¿Ya tienes una cuenta?",
      "dont_have_account": "¿No tienes una cuenta?",
      "create_account": "Crear cuenta",
      "welcome_back": "¡Bienvenido de vuelta!",
      "join_github": "Únete a GitHub",
      "forgot_password": "¿Olvidaste tu contraseña?",
      
      // Dashboard
      "welcome_back_user": "¡Bienvenido de vuelta, {{name}}! 👋",
      "ready_to_build": "¿Listo para construir algo increíble hoy? Tus repositorios te están esperando.",
      "import_repository": "Importar Repositorio",
      "all_repositories": "Todos los repositorios",
      "public_repositories": "Repositorios públicos",
      "private_repositories": "Repositorios privados",
      "recently_updated": "Actualizados recientemente",
      "recent_activity": "Actividad reciente",
      "your_stats": "Tus estadísticas",
      "total_repositories": "Total de repositorios",
      "total_stars": "Total de estrellas recibidas",
      "followers": "Seguidores",
      "following": "Siguiendo"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;