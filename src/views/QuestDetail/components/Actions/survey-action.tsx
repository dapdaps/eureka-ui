import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { QUEST_PATH } from '@/config/quest';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';

import MyCheckboxGroup from '../checkbox-group';
import MyRadioGroup from '../radio-group';
import { StyledExpandButton } from './styles';

const Container = styled.div`
  font-family: Gantari;
`;
const ErrorInfo = styled.div`
  color: #ff83c6;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Section = styled.section`
  border-radius: 16px;
  background-color: rgba(55, 58, 83, 0.5);
  margin-bottom: 10px;
  padding: 0 33px 14px;
`;
const Title = styled.div`
  padding: 14px 0;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
const Intro = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 97px;
  border-radius: 10px;
  background: #272938;
  color: white;
  padding: 5px;
`;

const Foot = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SurveyAction = ({ onSuccess, id, status }: any) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [isDisabled, setIsDisabled] = useState(true);

  const checkAction = async (id: number, data: string) => {
    if (loading) return;
    setLoading(true);
    const toastId = toast.loading({
      title: 'Submitting...',
    });
    try {
      const result = await get(`${QUEST_PATH}/api/quest/check_action?id=${id}&data=${data}`);
      if (result.code !== 0 || result.data?.status !== 'completed') throw new Error('Submit failed');
      toast.dismiss(toastId);
      toast.success({
        title: `Action confirmed successfully`,
      });
      setLoading(false);
      onSuccess();
    } catch (err: any) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.fail({
        title: err.message || `Action confirmed failed`,
      });
    }
  };
  const handleSubmit = () => {
    if (isDisabled) return;
    const _data = JSON.stringify(surveys.map((item) => item.answer));
    checkAction(id, _data);
  };

  const [surveys, setSurveys] = useState([
    {
      title: '1. Your Awareness of Blast L2:',
      type: 'radio',
      options: [
        { label: "I'm well-acquainted with Blast.", value: '1', checked: false },
        { label: "I've heard of it, but my knowledge is limited.", value: '2', checked: false },
        { label: 'First time hearing about it.', value: '3', checked: false },
      ],
      isRequired: true,
      answer: [],
    },
    {
      title: '2. Anticipation for Blast on DapDap:',
      type: 'radio',
      options: [
        { label: 'Yes, eagerly awaiting.', value: '1', checked: false },
        { label: 'immediately!! ', value: '2', checked: false },
        { label: 'Still undecided.', value: '3', checked: false },
      ],
      isRequired: true,
      answer: [],
    },
    {
      title: '3. Most Anticipated Blast Chain dApps:',
      type: 'checkbox',
      options: [
        { label: 'Timeswap', value: '1', checked: false },
        { label: 'SphereX', value: '2', checked: false },
        { label: 'RedStone Oracles', value: '3', checked: false },
        { label: 'nftperp.xyz', value: '4', checked: false },
        { label: 'BLASTOFF', value: '5', checked: false },
        { label: 'Risk', value: '6', checked: false },
        { label: 'Mangrove', value: '7', checked: false },
        { label: 'Juice', value: '8', checked: false },
        { label: 'Hyperlock Finance', value: '9', checked: false },
        { label: 'Aark', value: '10', checked: false },
        { label: 'Other (please specify):', value: '11', checked: false, type: 'others', text: '' },
      ],
      isRequired: true,
      answer: [],
    },
    {
      title: "4. Additional Thoughts regarding Blast's launch on DapDap:",
      type: 'textarea',
      options: [{ label: '', value: '1', checked: true }],
      isRequired: false,
      answer: [
        {
          '1': '',
        },
      ],
    },
  ]);
  const handleChange = (qIndex: number, aIndex: number, checked?: boolean, text?: string) => {
    // console.log('handle: ', qIndex, aIndex, checked, text);
    const _temp = [...surveys];
    if (_temp[qIndex].type === 'radio') {
      const _options = _temp[qIndex].options.map((item) => ({
        ...item,
        checked: false,
      }));
      _options[aIndex - 1].checked = true;
      _temp[qIndex].options = _options;
      (_temp[qIndex].answer as any) = _temp[qIndex].options
        .filter((item) => item.checked)
        .map((item) => ({ [item.value]: '' }));
    }
    if (_temp[qIndex].type === 'checkbox') {
      _temp[qIndex].options[aIndex].checked = checked as boolean;
      if (text) {
        (_temp[qIndex].options[aIndex] as any).text = text;
      }
      (_temp[qIndex].answer as any) = _temp[qIndex].options
        .filter((item) => item.checked)
        .map((item) => {
          if ((item as any)?.type === 'others') {
            return { [item.value]: (item as any).text };
          }
          return { [item.value]: '' };
        });
    }
    if (_temp[qIndex].type === 'textarea') {
      (_temp[qIndex].answer as any)[0]['1'] = text;
    }
    setSurveys(_temp);
  };

  const renderQa = (data: any, qIndex: number) => {
    switch (data.type) {
      case 'radio':
        return (
          <MyRadioGroup order={qIndex} outerSize={15} innerSize={9} options={data.options} onChange={handleChange} />
        );
      case 'checkbox':
        return <MyCheckboxGroup order={qIndex} outerSize={15} options={data.options} onChange={handleChange} />;
      case 'textarea':
        return (
          <StyledTextarea
            maxLength={500}
            onChange={(e) => handleChange(qIndex, 1, true, e.target.value)}
          ></StyledTextarea>
        );
    }
  };
  useEffect(() => {
    // console.log('surveys: ', surveys);
    const _isDisabled = surveys.some((item) => item.isRequired && (item.answer as any).length < 1);

    setIsDisabled(_isDisabled);
  }, [surveys]);
  return (
    <Container>
      {surveys.map((item, qIndex) => {
        return (
          <Section key={qIndex}>
            <Title>{item.title}</Title>
            {renderQa(item, qIndex)}
          </Section>
        );
      })}
      <Intro>
        We appreciate you taking the time to share your feedback and playing a crucial role in shaping the future of
        DapDap 🤜🤛
      </Intro>
      {status !== 'completed' ? (
        <Foot>
          {isDisabled ? (
            <ErrorInfo>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path
                  d="M17.5092 18H2.49149C1.4844 18 0.675363 17.6164 0.271319 16.9472C-0.132835 16.2781 -0.0836614 15.404 0.406721 14.5499L7.98397 1.35347C8.47719 0.493135 9.21064 0 9.99533 0C10.7801 0 11.5128 0.492517 12.0074 1.35209L19.5926 14.5513C20.0829 15.4054 20.1336 16.2788 19.7287 16.9479C19.3253 17.617 18.5156 18 17.5092 18ZM9.99608 1.38529C9.74659 1.38529 9.46079 1.62562 9.22911 2.0281L1.6519 15.2259C1.41449 15.6401 1.35891 16.0122 1.50072 16.2469C1.64265 16.481 2.00395 16.6155 2.49149 16.6155H17.5092C17.9975 16.6155 18.3581 16.4818 18.4999 16.2469C18.641 16.0128 18.5862 15.6409 18.3481 15.2267L10.763 2.02809C10.532 1.62562 10.2448 1.38529 9.99608 1.38529ZM10.0003 11.7509C9.60696 11.7509 9.28764 11.4413 9.28764 11.0582V4.82435C9.28764 4.44197 9.60696 4.13166 10.0003 4.13166C10.3938 4.13166 10.7131 4.44198 10.7131 4.82435V11.0582C10.7131 11.4413 10.3938 11.7509 10.0003 11.7509ZM9.99524 15.1367C10.6086 15.1367 11.1058 14.6526 11.1058 14.0555C11.1058 13.4584 10.6086 12.9743 9.99524 12.9743C9.38189 12.9743 8.88466 13.4584 8.88466 14.0555C8.88466 14.6526 9.38189 15.1367 9.99524 15.1367V15.1367Z"
                  fill="#FF83C6"
                />
              </svg>
              Please fill all the questions.
            </ErrorInfo>
          ) : (
            <div></div>
          )}

          <StyledExpandButton disabled={isDisabled} onClick={handleSubmit}>
            {loading ? <Loading size={16} /> : 'Submit'}
          </StyledExpandButton>
        </Foot>
      ) : null}
    </Container>
  );
};

export default memo(SurveyAction);
