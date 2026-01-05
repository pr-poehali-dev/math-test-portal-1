import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Question = {
  id: number;
  text: string;
  answer: string;
};

type Variant = {
  id: number;
  name: string;
  questions: Question[];
};

const variants: Variant[] = [
  {
    id: 1,
    name: 'Вариант 1',
    questions: [
      { id: 1, text: 'Найдите значение выражений:\n(24 + 16) + 38 =\n34 + (21 + 16) + 55 =', answer: '(24 + 16) + 38 = 78\n34 + (21 + 16) + 55 = 126' },
      { id: 2, text: 'Не выполняя вычислений назовите большую из сумм:\n242 + 16 или 224 + 12', answer: '242 + 16 больше, чем 224 + 12' },
      { id: 3, text: 'У треугольника AOD сторона AO меньше стороны OD на 2 см и на 1 см больше стороны AD. Вычислите периметр этого треугольника если сторона AD равна 8 см.', answer: '1) 8 + 1 = 9 (см) сторона AO;\n2) 9 - 2 = 7 (см) сторона OD;\n3) 9 + 7 + 8 = 24 (см).\nОтвет: периметр треугольника AOD равен 24 см.' },
      { id: 4, text: 'В саду росли абрикосы вишни и черешни. Всего 48 фруктовых деревьев. Абрикос росло на 8 меньше, чем вишен. Сколько черешен росло в саду, если известно, что вишен росло 18?', answer: '1) 18 - 8 = 10 абрикос росло в саду;\n2) 10 + 18 = 28 вишен и абрикос;\n3) 48 - 28 = 20.\nОтвет: в саду росло 20 черешен.' },
      { id: 5, text: 'Вычислите:\n169 - (51 + 18) + 41 - 24 =', answer: '169 - (51 + 18) + 41 - 24 = 117' },
    ],
  },
  {
    id: 2,
    name: 'Вариант 2',
    questions: [
      { id: 1, text: 'Найдите значение выражений:\n(53 + 12) + 37 =\n18 + (44 + 21) + 72 =', answer: '(53 + 12) + 37 = 102\n18 + (44 + 21) + 72 = 155' },
      { id: 2, text: 'Не выполняя вычислений назовите большую из сумм:\n194 + 29 или 211 + 18.', answer: '211 + 18 больше 194 + 29.' },
      { id: 3, text: 'У треугольника ABC сторона BC на 3 см больше, чем сторона AB и на 2 см меньше чем AC. Найдите периметр треугольника, если сторона BC равна 5 см.', answer: '1) 5 - 3 = 2 (см) сторона AB;\n2) 5 + 2 = 7 (см) сторона AC;\n3) 2 + 7 + 5 = 14 (см).\nОтвет: периметр треугольника равен 14 см.' },
      { id: 4, text: 'В трех начальных классах школы всего 91 учеников. В первом классе 28 учеников, во втором на 4 больше. Сколько учеников в третьем классе?', answer: '1) 28 + 4 = 32 (ученика) во втором классе;\n2) 28 + 32 = 60 (учеников) в первом и втором классах вместе;\n3) 91 - 60 = 31 (ученик).\nОтвет: в третьем классе учится 31 ученик.' },
      { id: 5, text: 'Вычислите:\n191 - (74 + 62) + 29 - 18 =', answer: '191 - (74 + 62) + 29 - 18 = 66' },
    ],
  },
  {
    id: 3,
    name: 'Вариант 3',
    questions: [
      { id: 1, text: 'Найдите значение выражений:\n(31 + 52) + 11 =\n92 + (43 + 15) + 48 =', answer: '(31 + 52) + 11 = 94\n92 + (43 + 15) + 48 = 198' },
      { id: 2, text: 'Не выполняя вычислений назовите большую из сумм:\n182 + 72 или 159 + 64.', answer: '182 + 72 больше чем 159 + 64' },
      { id: 3, text: 'Одна из сторон участка треугольной формы равна 12 метров, вторая на 4 метра больше, а третья на 2 метра меньше, чем вторая. Найдите периметр участка.', answer: '1) 12 + 4 = 16 (м) вторая сторона участка;\n2) 16 - 2 = 14 (м) третья сторона участка;\n2) 12 + 16 + 14 = 42 (м).\nОтвет: периметр участка равен 42 метра.' },
      { id: 4, text: 'На овощную базу завезли картофель, лук и капусту, всего 356 кг. Картофеля завезли на 51 кг больше чем капусты. Сколько лука завезли на овощную базу, если капусты завезли 91 кг?', answer: '1) 91 + 51 = 142 (кг) картофеля;\n2) 91 + 142 = 233 (кг) картофеля и капусты вместе;\n3) 356 - 233 = 123 (кг).\nОтвет: на овощную базу завезли 123 кг лука.' },
      { id: 5, text: 'Вычислите:\n391 - (29 + 18 - 13) - (27 + 16) =', answer: '391 - (29 + 18 - 13) - (27 + 16) = 314' },
    ],
  },
  {
    id: 4,
    name: 'Вариант 4',
    questions: [
      { id: 1, text: 'Решите примеры:\n67 + (71 - 56) =\n(39 + 14) + (39 + 22) =', answer: '67 + (71 - 56) = 82\n(39 + 14) + (39 + 22) = 114' },
      { id: 2, text: 'Сравните не выполняя вычислений:\n735 + 471 или 633 + 341.', answer: '735 + 471 больше чем 633 + 341.' },
      { id: 3, text: 'Одна из сторон треугольника равна 39 см вторая на 16 см меньше, а третья на 11 см больше чем вторая. Вычислите периметр треугольника.', answer: '1) 39 - 16 = 23 (см) вторая сторона треугольника;\n2) 23 + 11 = 34 (см) третья сторона треугольника;\n3) 39 + 23 + 34 = 96 (см).\nОтвет: периметр треугольника равен 96 см.' },
      { id: 4, text: 'Туристы за 3 дня преодолели 61 км. В первый день они прошли 12 км, во второй на 3 км меньше. Весь остальной путь они проехали на автобусе за третий день. Какое расстояние преодолели туристы за третий день?', answer: '1) 12 - 3 = 9 (км) прошли туристы во второй день;\n2) 12 + 9 = 21 (км) в первый и второй день вместе;\n3) 61 - 21 = 40 (км).\nОтвет: в третий день туристы преодолели 40 км.' },
      { id: 5, text: 'Вычислите:\n562 - (49 - 18 + 11) + (51 - 42) =', answer: '562 - (49 - 18 + 11) + (51 - 42) = 529' },
    ],
  },
];

type TestSubmission = {
  studentName: string;
  variantId: number;
  variantName: string;
  answers: { [key: number]: string };
  submittedAt: string;
  score: number | null;
  status: 'submitted' | 'graded' | 'inProgress';
};

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'student' | 'teacher'>('login');
  const [studentName, setStudentName] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [submissions, setSubmissions] = useState<TestSubmission[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const { toast } = useToast();

  const handleLogin = (name: string) => {
    if (name.toLowerCase() === 'никитовский') {
      setCurrentView('teacher');
      toast({
        title: 'Добро пожаловать, учитель!',
        description: 'Вы вошли в панель управления',
      });
    } else if (name.trim()) {
      setStudentName(name);
      setCurrentView('student');
      toast({
        title: `Привет, ${name}!`,
        description: 'Выбери вариант теста и начни работу',
      });
    }
  };

  const handleStartTest = (variantId: number) => {
    setSelectedVariant(variantId);
    setTestStarted(true);
    setAnswers({});
  };

  const handleSubmitTest = () => {
    if (!selectedVariant) return;

    const variant = variants.find(v => v.id === selectedVariant);
    if (!variant) return;

    const submission: TestSubmission = {
      studentName,
      variantId: selectedVariant,
      variantName: variant.name,
      answers,
      submittedAt: new Date().toLocaleString('ru-RU'),
      score: null,
      status: 'submitted',
    };

    setSubmissions([...submissions, submission]);
    setTestStarted(false);
    setSelectedVariant(null);
    setAnswers({});

    toast({
      title: 'Работа отправлена!',
      description: 'Учитель проверит твою работу и выставит баллы',
      className: 'bg-success text-success-foreground',
    });
  };

  const handleGradeTest = (index: number, score: number) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[index].score = score;
    updatedSubmissions[index].status = 'graded';
    setSubmissions(updatedSubmissions);

    toast({
      title: 'Оценка выставлена',
      description: `${updatedSubmissions[index].studentName}: ${score} баллов`,
    });
  };

  const LoginView = () => {
    const [name, setName] = useState('');

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name="GraduationCap" size={40} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Математика 6 класс</CardTitle>
            <CardDescription className="text-base">Введи своё имя, чтобы начать тест</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Твоё имя</Label>
              <Input
                id="name"
                placeholder="Например: Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin(name)}
                className="text-lg"
              />
            </div>
            <Button onClick={() => handleLogin(name)} className="w-full text-lg h-12" disabled={!name.trim()}>
              Войти
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Учителям: используйте свой логин для входа
            </p>
          </CardContent>
        </Card>
      </div>
    );
  };

  const StudentView = () => {
    if (testStarted && selectedVariant) {
      const variant = variants.find(v => v.id === selectedVariant);
      if (!variant) return null;

      const answeredCount = Object.keys(answers).length;
      const totalQuestions = variant.questions.length;

      return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 animate-fade-in">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{variant.name}</h1>
                <p className="text-muted-foreground">Ученик: {studentName}</p>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {answeredCount} / {totalQuestions}
              </Badge>
            </div>

            <div className="space-y-6">
              {variant.questions.map((question, idx) => (
                <Card key={question.id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardHeader>
                    <CardTitle className="text-lg">Задание {question.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="whitespace-pre-wrap text-base leading-relaxed">{question.text}</p>
                    <div className="space-y-2">
                      <Label htmlFor={`answer-${question.id}`}>Твоё решение:</Label>
                      <Textarea
                        id={`answer-${question.id}`}
                        placeholder="Напиши решение здесь..."
                        value={answers[question.id] || ''}
                        onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                        className="min-h-[120px] text-base"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="sticky bottom-4 mt-6 flex gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
              <Button variant="outline" onClick={() => setTestStarted(false)} className="flex-1">
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Назад
              </Button>
              <Button
                onClick={handleSubmitTest}
                className="flex-1"
                disabled={answeredCount === 0}
              >
                Сдать работу
                <Icon name="CheckCircle" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      );
    }

    const mySubmissions = submissions.filter(s => s.studentName === studentName);

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Привет, {studentName}! 👋</h1>
              <p className="text-muted-foreground mt-2">Выбери вариант и начни тест</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentView('login')}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>

          <Tabs defaultValue="tests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="tests">Тесты</TabsTrigger>
              <TabsTrigger value="results">Мои результаты</TabsTrigger>
            </TabsList>

            <TabsContent value="tests" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {variants.map((variant) => (
                  <Card key={variant.id} className="hover:shadow-lg transition-all animate-scale-in cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {variant.name}
                        <Icon name="FileText" size={24} className="text-primary group-hover:scale-110 transition-transform" />
                      </CardTitle>
                      <CardDescription>
                        {variant.questions.length} заданий
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => handleStartTest(variant.id)} className="w-full">
                        Начать тест
                        <Icon name="Play" size={20} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {mySubmissions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="FileQuestion" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Ты ещё не отправил ни одной работы</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {mySubmissions.map((submission, idx) => (
                    <Card key={idx} className="animate-fade-in">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{submission.variantName}</CardTitle>
                            <CardDescription>Отправлено: {submission.submittedAt}</CardDescription>
                          </div>
                          {submission.status === 'graded' ? (
                            <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                              {submission.score} баллов
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="text-lg px-4 py-2">
                              На проверке
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  const TeacherView = () => {
    const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
    const [tempScore, setTempScore] = useState<string>('');

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Панель учителя</h1>
              <p className="text-muted-foreground mt-2">Проверка работ и статистика</p>
            </div>
            <Button variant="outline" onClick={() => setCurrentView('login')}>
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Всего работ</CardTitle>
                <Icon name="FileText" size={20} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{submissions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">На проверке</CardTitle>
                <Icon name="Clock" size={20} className="text-accent-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent-foreground">
                  {submissions.filter(s => s.status === 'submitted').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Проверено</CardTitle>
                <Icon name="CheckCircle" size={20} className="text-success-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-success-foreground">
                  {submissions.filter(s => s.status === 'graded').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="submissions" className="space-y-6">
            <TabsList>
              <TabsTrigger value="submissions">Работы учеников</TabsTrigger>
              <TabsTrigger value="statistics">Статистика</TabsTrigger>
            </TabsList>

            <TabsContent value="submissions" className="space-y-4">
              {submissions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Пока нет отправленных работ</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {submissions.map((submission, idx) => {
                    const variant = variants.find(v => v.id === submission.variantId);
                    const isExpanded = selectedSubmission === idx;

                    return (
                      <Card key={idx} className="animate-fade-in">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <CardTitle className="text-xl">{submission.studentName}</CardTitle>
                              <CardDescription className="mt-1">
                                {submission.variantName} • {submission.submittedAt}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2 items-center">
                              {submission.status === 'graded' ? (
                                <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                                  {submission.score} баллов
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                  На проверке
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedSubmission(isExpanded ? null : idx)}
                              >
                                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={20} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>

                        {isExpanded && variant && (
                          <CardContent className="space-y-6 border-t pt-6">
                            {variant.questions.map((question) => (
                              <div key={question.id} className="space-y-3">
                                <div className="flex items-start gap-2">
                                  <Badge variant="outline">Задание {question.id}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{question.text}</p>
                                
                                <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                                  <p className="text-sm font-medium">Ответ ученика:</p>
                                  <p className="text-sm whitespace-pre-wrap">
                                    {submission.answers[question.id] || <span className="text-muted-foreground italic">Не отвечено</span>}
                                  </p>
                                </div>

                                <div className="bg-success/10 p-4 rounded-lg space-y-2">
                                  <p className="text-sm font-medium text-success-foreground">Правильное решение:</p>
                                  <p className="text-sm whitespace-pre-wrap text-success-foreground">{question.answer}</p>
                                </div>
                              </div>
                            ))}

                            {submission.status === 'submitted' && (
                              <div className="flex gap-3 items-end pt-4 border-t">
                                <div className="flex-1">
                                  <Label htmlFor={`score-${idx}`}>Выставить баллы (0-5)</Label>
                                  <Input
                                    id={`score-${idx}`}
                                    type="number"
                                    min="0"
                                    max="5"
                                    value={tempScore}
                                    onChange={(e) => setTempScore(e.target.value)}
                                    placeholder="Введите баллы"
                                  />
                                </div>
                                <Button
                                  onClick={() => {
                                    const score = parseInt(tempScore);
                                    if (!isNaN(score) && score >= 0 && score <= 5) {
                                      handleGradeTest(idx, score);
                                      setTempScore('');
                                      setSelectedSubmission(null);
                                    }
                                  }}
                                  disabled={!tempScore || parseInt(tempScore) < 0 || parseInt(tempScore) > 5}
                                >
                                  Сохранить оценку
                                  <Icon name="Save" size={20} className="ml-2" />
                                </Button>
                              </div>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="statistics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика по ученикам</CardTitle>
                  <CardDescription>Результаты всех проверенных работ</CardDescription>
                </CardHeader>
                <CardContent>
                  {submissions.filter(s => s.status === 'graded').length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      Нет проверенных работ
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Array.from(new Set(submissions.map(s => s.studentName))).map(studentName => {
                        const studentSubmissions = submissions.filter(
                          s => s.studentName === studentName && s.status === 'graded'
                        );
                        const avgScore = studentSubmissions.length > 0
                          ? (studentSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / studentSubmissions.length).toFixed(1)
                          : 0;

                        return (
                          <div key={studentName} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">{studentName}</p>
                              <p className="text-sm text-muted-foreground">
                                Работ проверено: {studentSubmissions.length}
                              </p>
                            </div>
                            <Badge className="text-lg px-4 py-2">
                              Средний балл: {avgScore}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentView === 'login' && <LoginView />}
      {currentView === 'student' && <StudentView />}
      {currentView === 'teacher' && <TeacherView />}
    </>
  );
};

export default Index;