import { Modal, Button, Form, Input, Radio,message } from "antd";
import { useMutation } from "react-query";
import { service } from "@/api/index";
import { client } from "@/common/client";
import { WARN } from "@/common/queryKey";
import { Valid } from "@/common/dict";
import * as R from "ramda";
import { useEffect } from "react";
export default function DialogHandle({ data, open, onClose }) {
  const [form] = Form.useForm();
  // 提交
  const submitAction = useMutation(
    (v) => {
      return service.warnHandle.add({
        ...v,
        warningId: data.id,
        serialNumber: data.serialNumber,
      });
    },
    {
      onSuccess() {
        message.success("处理成功");
        client.invalidateQueries(WARN);
        onClose();
      },
    }
  );
  useEffect(()=>{
    if(!open){
      form.resetFields()
    }
  },[open])
  return (
    <Modal
      width="400px"
      open={open}
      onCancel={onClose}
      title={`${data.channel || "监控"}(${data.serialNumber})`}
      destroyOnClose
      footer={
        <div className="w-full flex justify-center gap-x-8">
          <Button type="primary" onClick={() => form.submit()} loading={submitAction.isLoading}>
            确定
          </Button>
          <Button type="default" onClick={onClose} loading={submitAction.isLoading}>
            取消
          </Button>
        </div>
      }
    >
      <div className="h-max-[60vh] pt-4">
        <Form form={form} onFinish={(v) => submitAction.mutate(v)} initialValues={{ valid: '1' }}>
          <Form.Item label="处理内容" name="handleResult">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="是否有效" name="valid">
            <Radio.Group  options={R.keys(Valid).filter((v)=>+v).map((item) => {
                    return { value: item, label: Valid[item] };
                  })}>
              
              {/* <Radio value={1}>有效</Radio>
              <Radio value={2}>无效</Radio> */}
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
